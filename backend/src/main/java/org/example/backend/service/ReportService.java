package org.example.backend.service;

import org.example.backend.dto.Quiz.QuizMetricsDTO;
import org.example.backend.dto.Quiz.QuizRankingEntryDTO;
import org.example.backend.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final ResultRepository resultRepository;

    @Autowired
    public ReportService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    public QuizMetricsDTO getQuizMetrics(UUID quizId) {
        return this.resultRepository.getQuizMetrics(quizId);
    }

    public Page<QuizRankingEntryDTO> getQuizRanking(UUID quizId, Pageable pageable) {
        Page<Map<String, Object>> rawPage = this.resultRepository.findQuizRanking(quizId, pageable);

        List<QuizRankingEntryDTO> content = rawPage.getContent().stream()
                .map(this::mapToRankingDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(content, rawPage.getPageable(), rawPage.getTotalElements());
    }

    private QuizRankingEntryDTO mapToRankingDTO(Map<String, Object> map) {
        Long rank = ((Number) map.get("rank")).longValue();
        String userName = (String) map.get("username");
        Double score = ((Number) map.get("score")).doubleValue();
        LocalDateTime completedAt = ((Timestamp) map.get("completedat")).toLocalDateTime();

        return new QuizRankingEntryDTO(rank, userName, score, completedAt);
    }

}
