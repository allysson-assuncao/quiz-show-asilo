package org.example.backend.controller;

import org.example.backend.dto.Question.MostFailedQuestionsDTO;
import org.example.backend.dto.Quiz.QuizMetricsDTO;
import org.example.backend.dto.Quiz.QuizRankingEntryDTO;
import org.example.backend.dto.Quiz.UserQuizAnswerCountDTO;
import org.example.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/app/report")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/quizzes/{quizId}/metrics")
    public ResponseEntity<QuizMetricsDTO> getQuizMetrics(@PathVariable UUID quizId) {
        return ResponseEntity.ok(reportService.getQuizMetrics(quizId));
    }

    @GetMapping("/user-activity")
    public ResponseEntity<List<UserQuizAnswerCountDTO>> getUserActivity() {
        return ResponseEntity.ok(reportService.getUserQuizAnswerCounts());
    }

    @GetMapping("/quizzes/{quizId}/ranking")
    public ResponseEntity<Page<QuizRankingEntryDTO>> getQuizRanking(
            @PathVariable UUID quizId,
            @PageableDefault(size = 10, sort = "score", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(this.reportService.getQuizRanking(quizId, pageable));
    }

    @GetMapping("/quizzes/{quizId}/most-failed-questions")
    public ResponseEntity<List<MostFailedQuestionsDTO>> getMostFailedQuestions(@PathVariable UUID quizId) {
        return ResponseEntity.ok(reportService.getMostFailedQuestions(quizId));
    }

}
