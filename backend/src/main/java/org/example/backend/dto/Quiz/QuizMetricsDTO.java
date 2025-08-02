package org.example.backend.dto.Quiz;

import lombok.Builder;

@Builder
public record QuizMetricsDTO(String topScorerName, Double topScore, Double averageScore, Long totalAttempts, Long distinctParticipants, Long maxCorrectAnswers) {}
