package org.example.backend.dto.Question;

import java.util.UUID;

public record SimpleQuestionDTO(UUID id, String text) {
}
