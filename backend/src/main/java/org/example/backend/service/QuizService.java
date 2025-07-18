package org.example.backend.service;

import org.example.backend.repository.QuizRepository;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }
}
