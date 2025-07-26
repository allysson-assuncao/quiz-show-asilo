package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.Quiz.QuizForTakingDTO;
import org.example.backend.dto.Quiz.QuizRequestDTO;
import org.example.backend.dto.Quiz.SimpleQuizDTO;
import org.example.backend.model.Quiz;
import org.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/app/quiz")
public class QuizController {

    private final QuizService quizService;

    @Autowired
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("register")
    public ResponseEntity<Quiz> createQuiz(@Valid @RequestBody QuizRequestDTO quizRequestDTO) {
        Quiz createdQuiz = quizService.createQuiz(quizRequestDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdQuiz.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdQuiz);
    }

    @GetMapping("/select-all-simple")
    public ResponseEntity<List<SimpleQuizDTO>> getAllSimpleQuizzes() {
        return ResponseEntity.ok(this.quizService.getAllSimpleQuizzes());
    }

    @GetMapping("/{id}/take")
    public ResponseEntity<QuizForTakingDTO> getQuizForTaking(@PathVariable UUID id) {
        return ResponseEntity.ok(quizService.getQuizForTaking(id));
    }

}
