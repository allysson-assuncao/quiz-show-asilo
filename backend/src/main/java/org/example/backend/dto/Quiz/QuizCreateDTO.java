package org.example.backend.dto.Quiz;

import java.util.ArrayList;
import java.util.UUID;

public record QuizCreateDTO(String title, String description, ArrayList<UUID> questions ) {
}
