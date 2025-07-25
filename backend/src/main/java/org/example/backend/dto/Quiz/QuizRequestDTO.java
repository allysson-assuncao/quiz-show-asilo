package org.example.backend.dto.Quiz;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.Set;
import java.util.UUID;

public record QuizRequestDTO(
        @NotBlank(message = "O título é obrigatório.")
        @Size(min = 3, message = "O título deve ter no mínimo 3 caracteres.")
        String title,
        String description,
        @NotEmpty(message = "Selecione pelo menos uma pergunta para o quiz.")
        Set<UUID> questionIds
) {
}