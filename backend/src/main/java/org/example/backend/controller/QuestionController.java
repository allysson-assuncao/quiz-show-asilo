package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.Question.QuestionRequestDTO;
import org.example.backend.model.Question;
import org.example.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/app/question")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("register")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody QuestionRequestDTO questionRequestDTO) {
        Question createdQuestion = questionService.createQuestion(questionRequestDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdQuestion.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdQuestion);
    }

}
