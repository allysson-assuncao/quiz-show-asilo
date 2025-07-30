package org.example.backend.dto.Quiz;

public record QuizMetricsDTO(String topScorerName, Double topScore, Double averageScore, Long totalAttempts, Long distinctParticipants) {}
