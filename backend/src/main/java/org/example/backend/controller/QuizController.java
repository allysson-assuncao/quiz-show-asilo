package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.Quiz.QuizRequestDTO;
import org.example.backend.model.Quiz;
import org.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/app/quiz")
public class QuizController {

    private final QuizService quizService;

    @Autowired
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@Valid @RequestBody QuizRequestDTO quizRequestDTO) {
        Quiz createdQuiz = quizService.createQuiz(quizRequestDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdQuiz.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdQuiz);
    }

}
