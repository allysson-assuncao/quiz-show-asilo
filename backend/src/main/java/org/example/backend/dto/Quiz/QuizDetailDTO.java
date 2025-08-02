package org.example.backend.dto.Quiz;

import org.example.backend.dto.Question.SimpleQuestionDTO;

import java.util.List;
import java.util.UUID;

/**
 * DTO para exibir os detalhes completos de um Quiz para fins de gerenciamento.
 * Inclui a lista de perguntas associadas.
 */
public record QuizDetailDTO(
        UUID id,
        String title,
        String description,
        List<SimpleQuestionDTO> questions
) {
}