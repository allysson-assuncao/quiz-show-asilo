package org.example.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.dto.Choice.ChoiceDTO;
import org.example.backend.dto.Question.QuestionForTakingDTO;
import org.example.backend.dto.Quiz.QuizForTakingDTO;
import org.example.backend.dto.Quiz.QuizRequestDTO;
import org.example.backend.dto.Quiz.SimpleQuizDTO;
import org.example.backend.model.Choice;
import org.example.backend.model.Question;
import org.example.backend.model.Quiz;
import org.example.backend.repository.QuestionRepository;
import org.example.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @Transactional
    public Quiz createQuiz(QuizRequestDTO dto) {
        this.quizRepository.findByTitle(dto.title()).ifPresent(q -> {
            throw new IllegalArgumentException("Já existe um quiz com o título: " + dto.title());
        });

        List<Question> foundQuestions = this.questionRepository.findAllById(dto.questionIds());
        if (foundQuestions.size() != dto.questionIds().size()) {
            throw new EntityNotFoundException("Uma ou mais perguntas não foram encontradas.");
        }

        Quiz newQuiz = new Quiz();
        newQuiz.setTitle(dto.title());
        newQuiz.setDescription(dto.description());
        newQuiz.setQuestions(new HashSet<>(foundQuestions));

        return this.quizRepository.save(newQuiz);
    }

    public List<SimpleQuizDTO> getAllSimpleQuizzes() {
        return this.quizRepository.findAllSimple();
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
                .toList();

        return new QuizForTakingDTO(quiz.getId(), quiz.getTitle(), questionDTOs);
    }

}
