package org.example.backend.dto.Question;

import org.example.backend.dto.Choice.ChoiceDTO;

import java.util.List;
import java.util.UUID;

public record QuestionForTakingDTO(UUID id, String text, boolean isMultipleChoice, List<ChoiceDTO> choices) {}
