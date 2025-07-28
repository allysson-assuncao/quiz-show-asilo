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
import java.util.Map;
import java.util.UUID;
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

        Map<UUID, UUID> correctAnswersMap = quiz.getQuestions().stream()
                .collect(Collectors.toMap(
                        Question::getId,
                        question -> question.getChoices().stream()
                                .filter(Choice::isCorrect)
                                .findFirst()
                                .map(Choice::getId)
                                .orElseThrow(() -> new IllegalStateException("Pergunta sem resposta correta: " + question.getId()))
                ));

        int correctAnswersCount = 0;
        for (UserAnswerDTO userAnswer : dto.answers()) {
            UUID correctChoiceId = correctAnswersMap.get(userAnswer.questionId());
            if (correctChoiceId != null && correctChoiceId.equals(userAnswer.choiceId())) {
                correctAnswersCount++;
            }
        }

        int totalQuestions = quiz.getQuestions().size();
        double score = totalQuestions > 0 ? ((double) correctAnswersCount / totalQuestions) * 100 : 0;

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
                totalQuestions - correctAnswersCount,
                score
        );
    }

}
