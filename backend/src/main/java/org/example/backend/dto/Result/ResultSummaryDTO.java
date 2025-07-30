package org.example.backend.dto.Result;

public record ResultSummaryDTO(long resultId, int totalQuestions, int correctAnswers, int wrongAnswers, double score) {}
