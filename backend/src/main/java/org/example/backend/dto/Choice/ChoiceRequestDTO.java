package org.example.backend.dto.Choice;

import jakarta.validation.constraints.NotBlank;

public record ChoiceRequestDTO(@NotBlank String text, boolean isCorrect) { }
