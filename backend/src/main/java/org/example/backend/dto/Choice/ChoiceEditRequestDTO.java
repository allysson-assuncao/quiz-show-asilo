package org.example.backend.dto.Choice;

import java.util.UUID;

public record ChoiceEditRequestDTO(UUID choiceId, String newText, boolean isCorrect) {}
