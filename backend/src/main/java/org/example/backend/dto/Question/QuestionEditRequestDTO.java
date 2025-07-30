package org.example.backend.dto.Question;

import org.example.backend.dto.Choice.ChoiceEditRequestDTO;

import java.util.List;
import java.util.UUID;

public record QuestionEditRequestDTO(UUID questionId, String newText, List<ChoiceEditRequestDTO> choices) {}
