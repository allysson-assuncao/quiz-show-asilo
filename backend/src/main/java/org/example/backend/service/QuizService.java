package org.example.backend.service;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.example.backend.dto.Choice.ChoiceDTO;
import org.example.backend.dto.Question.QuestionForTakingDTO;
import org.example.backend.dto.Quiz.QuizForTakingDTO;
import org.example.backend.dto.Quiz.QuizRequestDTO;
import org.example.backend.dto.Quiz.SimpleQuizDTO;
import org.example.backend.model.Choice;
import org.example.backend.dto.Question.SimpleQuestionDTO;
import org.example.backend.dto.Quiz.*;
import org.example.backend.model.Question;
import org.example.backend.model.Quiz;
import org.example.backend.repository.QuestionRepository;
import org.example.backend.repository.QuizRepository;
import org.example.backend.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final ResultRepository resultRepository;

    @Autowired
    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository, ResultRepository resultRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.resultRepository = resultRepository;
    }

    @Transactional
    public Quiz createQuiz(QuizRequestDTO dto) {
        this.quizRepository.findByTitle(dto.title()).ifPresent(q -> {
            throw new EntityExistsException("Já existe um quiz com o título: " + dto.title());
        });

        Set<Question> foundQuestions = findQuestionsByIds(dto.questionIds());

        Quiz newQuiz = new Quiz();
        newQuiz.setTitle(dto.title());
        newQuiz.setDescription(dto.description());
        newQuiz.setQuestions(foundQuestions);
        newQuiz.setCreatedAt(LocalDateTime.now());
        return this.quizRepository.save(newQuiz);
    }

    @Transactional(readOnly = true)
    public List<SimpleQuizDTO> getAllSimpleQuizzes() {
        return this.quizRepository.findAllSimple();
    }

    @Transactional(readOnly = true)
    public QuizDetailDTO getQuizDetailsById(UUID quizId) {
        return quizRepository.findById(quizId)
                .map(this::mapToQuizDetailDTO)
                .orElseThrow(() -> new EntityNotFoundException("Quiz não encontrado com o ID: " + quizId));
    }

    @Transactional
    public Quiz updateQuiz(UUID quizId, QuizUpdateDTO dto) {
        if (quizRepository.existsByTitleAndIdNot(dto.title(), quizId)) {
            throw new EntityExistsException("O título '" + dto.title() + "' já está em uso por outro quiz.");
        }

        Quiz quizToUpdate = quizRepository.findById(quizId)
                .orElseThrow(() -> new EntityNotFoundException("Quiz não encontrado com o ID: " + quizId));

        Set<Question> foundQuestions = findQuestionsByIds(dto.questionIds());

        quizToUpdate.setTitle(dto.title());
        quizToUpdate.setDescription(dto.description());
        quizToUpdate.setQuestions(foundQuestions);

        return quizRepository.save(quizToUpdate);
    }

    @Transactional
    public void deleteQuiz(UUID quizId) {
        Quiz quizToDelete = quizRepository.findById(quizId)
                .orElseThrow(() -> new EntityNotFoundException("Quiz não encontrado com o ID: " + quizId));

        quizToDelete.setDeleted(true);
        quizRepository.save(quizToDelete);

    }

    @Transactional(readOnly = true)
    public QuizForTakingDTO getQuizForTaking(UUID quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new EntityNotFoundException("Quiz não encontrado com o ID: " + quizId));

        List<QuestionForTakingDTO> questionDTOs = quiz.getQuestions().stream()
                .map(question -> {
                    long correctChoicesCount = question.getChoices().stream().filter(Choice::isCorrect).count();
                    boolean isMultiple = correctChoicesCount > 1;

                    return new QuestionForTakingDTO(
                            question.getId(),
                            question.getText(),
                            isMultiple,
                            question.getChoices().stream()
                                    .map(choice -> new ChoiceDTO(choice.getId(), choice.getText()))
                                    .toList()
                    );
                })
                .collect(Collectors.toList());
                    Collections.shuffle(questionDTOs);

        return new QuizForTakingDTO(quiz.getId(), quiz.getTitle(), questionDTOs);
    }

    // --- Métodos Auxiliares ---

    private Set<Question> findQuestionsByIds(Set<UUID> questionIds) {
        Set<Question> foundQuestions = new HashSet<>(this.questionRepository.findAllById(questionIds));
        if (foundQuestions.size() != questionIds.size()) {
            throw new EntityNotFoundException("Uma ou mais perguntas não foram encontradas.");
        }
        return foundQuestions;
    }

    private QuizDetailDTO mapToQuizDetailDTO(Quiz quiz) {
        List<SimpleQuestionDTO> questionDTOs = quiz.getQuestions().stream()
                .map(q -> new SimpleQuestionDTO(q.getId(), q.getText()))
                .collect(Collectors.toList());

        return new QuizDetailDTO(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                questionDTOs
        );
    }
}