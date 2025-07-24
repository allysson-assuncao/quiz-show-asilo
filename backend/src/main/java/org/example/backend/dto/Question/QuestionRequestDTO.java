package org.example.backend.dto.Question;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import org.example.backend.dto.Choice.ChoiceRequestDTO;

import java.util.List;

public record QuestionRequestDTO(
        @NotBlank(message = "O texto da pergunta não pode ser vazio.")
        String text,
        @Valid
        @NotEmpty(message = "A pergunta deve ter pelo menos uma alternativa.")
        @Size(min = 2, message = "A pergunta deve ter no mínimo 2 alternativas.")
        List<ChoiceRequestDTO> choices
) {
}
