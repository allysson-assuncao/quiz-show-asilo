package org.example.backend.dto.Result;

import org.example.backend.dto.User.UserAnswerDTO;

import java.util.List;
import java.util.UUID;

public record ResultRequestDTO(UUID quizId, String userEmail, List<UserAnswerDTO> answers) {}
