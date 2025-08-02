package org.example.backend.repository;

import org.example.backend.model.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChoiceRepository extends JpaRepository<Choice, UUID> {
}
