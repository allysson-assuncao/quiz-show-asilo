package org.example.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.dto.Quiz.QuizRequestDTO;
import org.example.backend.model.Question;
import org.example.backend.model.Quiz;
import org.example.backend.repository.QuestionRepository;
import org.example.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

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

}
