package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.FilteredPageDTO;
import org.example.backend.dto.Question.QuestionDeleteRequestDTO;
import org.example.backend.dto.Question.QuestionEditRequestDTO;
import org.example.backend.dto.Question.QuestionRequestDTO;
import org.example.backend.dto.Question.SimpleQuestionDTO;
import org.example.backend.model.Question;
import org.example.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

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
        Question createdQuestion = this.questionService.createQuestion(questionRequestDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{questionId}")
                .buildAndExpand(createdQuestion.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdQuestion);
    }

    @GetMapping("/select-all-simple")
    public ResponseEntity<List<SimpleQuestionDTO>> getAllSimpleQuestions() {
        List<SimpleQuestionDTO> questions = this.questionService.getAllSimpleQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/get-questions-page")
    public ResponseEntity<FilteredPageDTO<SimpleQuestionDTO>> fetchQuestionsI(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "text") String orderBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction
    ) {
        Page<SimpleQuestionDTO> questionPage = this.questionService.getAllPageableQuestions(page, size, orderBy, direction);
        return ResponseEntity.ok(new FilteredPageDTO<>(questionPage.getContent(), questionPage.getTotalPages()));
    }

    @PostMapping("/delete-question")
    public ResponseEntity<Boolean> deleteQuestion(
            @RequestBody QuestionDeleteRequestDTO questionDeleteRequestDTO
    ) {
        boolean deleted = this.questionService.deleteQuestion(questionDeleteRequestDTO);
        return ResponseEntity.ok(deleted);
    }

    @PostMapping("/update-question")
    public ResponseEntity<Question> updateQuestion(@Valid @RequestBody QuestionEditRequestDTO requestDTO) {
        //TODO...
        return new ResponseEntity<Question>(HttpStatus.OK);
    }

}
