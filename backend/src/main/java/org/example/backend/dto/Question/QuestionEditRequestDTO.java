package org.example.backend.dto.Question;

import lombok.Builder;
import org.example.backend.dto.Choice.ChoiceEditRequestDTO;

import java.util.List;
import java.util.UUID;

@Builder
public record QuestionEditRequestDTO(UUID questionId, String newText, List<ChoiceEditRequestDTO> choices) {}
