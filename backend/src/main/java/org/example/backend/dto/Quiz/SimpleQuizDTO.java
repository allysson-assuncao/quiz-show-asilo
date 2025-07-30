package org.example.backend.dto.Quiz;

import java.util.UUID;

public record SimpleQuizDTO(UUID id, String title, String description, int questionCount) {}
