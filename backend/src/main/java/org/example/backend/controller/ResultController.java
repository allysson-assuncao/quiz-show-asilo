package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.Result.ResultRequestDTO;
import org.example.backend.dto.Result.ResultSummaryDTO;
import org.example.backend.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/app/result")
public class ResultController {

    private final ResultService resultService;

    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping("register")
    public ResponseEntity<ResultSummaryDTO> submitResult(@Valid @RequestBody ResultRequestDTO resultRequestDTO) {
        ResultSummaryDTO summary = resultService.submitResult(resultRequestDTO);
        return ResponseEntity.ok(summary);
    }

}
