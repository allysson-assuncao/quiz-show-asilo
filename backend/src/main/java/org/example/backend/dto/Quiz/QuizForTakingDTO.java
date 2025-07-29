package org.example.backend.dto.Quiz;

import org.example.backend.dto.Question.QuestionForTakingDTO;

import java.util.List;
import java.util.UUID;

public record QuizForTakingDTO(UUID id, String title, List<QuestionForTakingDTO> questions) {}
