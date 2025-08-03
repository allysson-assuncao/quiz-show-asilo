package org.example.backend.dto.Choice;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ChoiceEditRequestDTO(UUID choiceId, String text, boolean isCorrect) {}
