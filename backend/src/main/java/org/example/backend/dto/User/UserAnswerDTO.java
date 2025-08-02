package org.example.backend.dto.User;

import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record UserAnswerDTO(UUID questionId, List<UUID> choiceIds) {}
