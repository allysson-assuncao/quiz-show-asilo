package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.Quiz.*;
import org.example.backend.model.Quiz;
import org.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Quiz> createQuiz(@Valid @RequestBody QuizRequestDTO quizRequestDTO) {
        Quiz createdQuiz = quizService.createQuiz(quizRequestDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdQuiz.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdQuiz);
    }

    @GetMapping("/simple-list")
    public ResponseEntity<List<SimpleQuizDTO>> getAllSimpleQuizzes() {
        return ResponseEntity.ok(this.quizService.getAllSimpleQuizzes());
    }

    @GetMapping("/{id}/details")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<QuizDetailDTO> getQuizDetails(@PathVariable UUID id) {
        return ResponseEntity.ok(quizService.getQuizDetailsById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable UUID id, @Valid @RequestBody QuizUpdateDTO quizUpdateDTO) {
        Quiz updatedQuiz = quizService.updateQuiz(id, quizUpdateDTO);
        return ResponseEntity.ok(updatedQuiz);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteQuiz(@PathVariable UUID id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/take")
    public ResponseEntity<QuizForTakingDTO> getQuizForTaking(@PathVariable UUID id) {
        return ResponseEntity.ok(quizService.getQuizForTaking(id));
    }
}