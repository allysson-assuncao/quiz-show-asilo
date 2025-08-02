package org.example.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.dto.Result.ResultRequestDTO;
import org.example.backend.dto.Result.ResultSummaryDTO;
import org.example.backend.dto.User.UserAnswerDTO;
import org.example.backend.model.*;
import org.example.backend.repository.*;
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
    private final UserRepository userRepository;
    private final ChoiceRepository choiceRepository;

    @Autowired
    public ResultService(ResultRepository resultRepository, QuizRepository quizRepository, UserRepository userRepository, ChoiceRepository choiceRepository) {
        this.resultRepository = resultRepository;
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.choiceRepository = choiceRepository;
    }

    @Transactional
    public ResultSummaryDTO submitResult(ResultRequestDTO dto) {
        Quiz quiz = this.quizRepository.findById(dto.quizId())
                .orElseThrow(() -> new EntityNotFoundException("Quiz não encontrado."));

        User user = this.userRepository.findByEmail(dto.userEmail())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        Set<UUID> allUserChoiceIds = dto.answers().stream()
                .flatMap(answer -> answer.choiceIds().stream())
                .collect(Collectors.toSet());
        Map<UUID, Choice> userChoicesMap = this.choiceRepository.findAllById(allUserChoiceIds).stream()
                .collect(Collectors.toMap(Choice::getId, choice -> choice));

        Map<UUID, Set<UUID>> correctAnswersMap = quiz.getQuestions().stream()
                .collect(Collectors.toMap(
                        Question::getId,
                        question -> question.getChoices().stream()
                                .filter(Choice::isCorrect)
                                .map(Choice::getId)
                                .collect(Collectors.toSet())
                ));

        Result newResult = new Result();
        newResult.setQuiz(quiz);
        newResult.setCreatedAt(LocalDateTime.now());
        user.addResult(newResult);

        int totalQuestions = quiz.getQuestions().size();
        double totalScore = 0.0;
        int correctAnswersCount = 0;
        int wrongAnswersCount = 0;

        Map<UUID, Set<UUID>> userAnswersMap = dto.answers().stream()
                .collect(Collectors.toMap(UserAnswerDTO::questionId, ua -> new HashSet<>(ua.choiceIds())));

        for (Question question : quiz.getQuestions()) {
            Set<UUID> correctChoiceIds = correctAnswersMap.getOrDefault(question.getId(), Collections.emptySet());
            Set<UUID> userChoiceIdsForQuestion = userAnswersMap.getOrDefault(question.getId(), Collections.emptySet());

            Answer answer = new Answer();
            answer.setQuestion(question);

            List<Choice> selectedChoices = userChoiceIdsForQuestion.stream()
                    .map(userChoicesMap::get)
                    .collect(Collectors.toList());
            answer.setChoices(selectedChoices);

            if (correctChoiceIds.isEmpty()) continue;

            long correctMarked = userChoiceIdsForQuestion.stream().filter(correctChoiceIds::contains).count();
            long incorrectMarked = userChoiceIdsForQuestion.stream().filter(id -> !correctChoiceIds.contains(id)).count();

            if (incorrectMarked > 0) {
                wrongAnswersCount++;
            } else {
                if (correctMarked == correctChoiceIds.size()) {
                    correctAnswersCount++;
                    totalScore += 1.0;
                } else {
                    wrongAnswersCount++;
                    totalScore += ((double) correctMarked) / correctChoiceIds.size();
                }
            }
            boolean isAnswerCorrect = (incorrectMarked == 0 && correctMarked == correctChoiceIds.size());
            answer.setCorrect(isAnswerCorrect);
            newResult.addAnswer(answer);
        }

        double finalScore = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;
        newResult.setScore(finalScore);

        Result savedResult = this.resultRepository.save(newResult);

        return new ResultSummaryDTO(
                savedResult.getId(),
                totalQuestions,
                correctAnswersCount,
                wrongAnswersCount,
                finalScore
        );
    }

}
