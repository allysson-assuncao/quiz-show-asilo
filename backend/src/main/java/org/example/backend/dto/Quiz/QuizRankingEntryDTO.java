package org.example.backend.dto.Quiz;

import java.time.LocalDateTime;

public record QuizRankingEntryDTO(Long rank, String userName, Double score, LocalDateTime completedAt) { }
