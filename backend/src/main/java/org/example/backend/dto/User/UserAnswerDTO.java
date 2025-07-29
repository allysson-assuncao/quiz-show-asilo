package org.example.backend.dto.User;

import java.util.UUID;

public record UserAnswerDTO(UUID questionId, UUID choiceId) {}
