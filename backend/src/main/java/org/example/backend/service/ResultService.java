package org.example.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.dto.Result.ResultRequestDTO;
import org.example.backend.dto.Result.ResultSummaryDTO;
import org.example.backend.dto.User.UserAnswerDTO;
import org.example.backend.model.*;
import org.example.backend.repository.QuestionRepository;
import org.example.backend.repository.QuizRepository;
import org.example.backend.repository.ResultRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResultService {

    private final ResultRepository resultRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @Autowired
    public ResultService(ResultRepository resultRepository, QuizRepository quizRepository, QuestionRepository questionRepository, UserRepository userRepository) {
        this.resultRepository = resultRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResultSummaryDTO submitResult(ResultRequestDTO dto) {
        Quiz quiz = this.quizRepository.findById(dto.quizId())
                .orElseThrow(() -> new EntityNotFoundException("Quiz não encontrado."));

        User user = this.userRepository.findByEmail(dto.userEmail())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        Map<UUID, Set<UUID>> correctAnswersMap = quiz.getQuestions().stream()
                .collect(Collectors.toMap(
                        Question::getId,
                        question -> question.getChoices().stream()
                                .filter(Choice::isCorrect)
                                .map(Choice::getId)
                                .collect(Collectors.toSet())
                ));

        int totalQuestions = quiz.getQuestions().size();
        double totalScore = 0.0;
        int correctAnswersCount = 0;
        int wrongAnswersCount = 0;

        // Para facilitar a busca das respostas do usuário por questão
        Map<UUID, Set<UUID>> userAnswersMap = dto.answers().stream()
                .collect(Collectors.toMap(
                        UserAnswerDTO::questionId,
                        ua -> new HashSet<>(ua.choiceIds())
                ));

        for (Question question : quiz.getQuestions()) {
            Set<UUID> correctChoiceIds = correctAnswersMap.getOrDefault(question.getId(), Collections.emptySet());
            Set<UUID> userChoiceIds = userAnswersMap.getOrDefault(question.getId(), Collections.emptySet());

            if (correctChoiceIds.isEmpty()) {
                // Questão sem alternativas corretas, ignora
                continue;
            }

            // Pontuação da questão (cada questão vale 1 ponto)
            double questionScore = 0.0;

            // Conta quantas alternativas corretas o usuário marcou
            long correctMarked = userChoiceIds.stream().filter(correctChoiceIds::contains).count();

            // Conta quantas alternativas incorretas o usuário marcou
            long incorrectMarked = userChoiceIds.stream().filter(id -> !correctChoiceIds.contains(id)).count();

            // Se o usuário marcou alternativas incorretas, a questão é considerada errada (pode-se ajustar essa regra)
            if (incorrectMarked > 0) {
                wrongAnswersCount++;
                // Não soma pontos para essa questão
            } else {
                // Soma pontos proporcionais às corretas marcadas
                questionScore = ((double) correctMarked) / correctChoiceIds.size();
                totalScore += questionScore;
                // Considera correta se marcou todas as corretas e nenhuma errada
                if (correctMarked == correctChoiceIds.size()) {
                    correctAnswersCount++;
                } else {
                    wrongAnswersCount++;
                }
            }
        }

        // Normaliza a pontuação para 0-100
        double score = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

        Result newResult = new Result();
        newResult.setQuiz(quiz);
        newResult.setCreatedAt(LocalDateTime.now());
        newResult.setScore(score);

        user.addResult(newResult);

        Result savedResult = this.resultRepository.save(newResult);

        return new ResultSummaryDTO(
                savedResult.getId(),
                totalQuestions,
                correctAnswersCount,
                wrongAnswersCount,
                score
        );
    }

}
