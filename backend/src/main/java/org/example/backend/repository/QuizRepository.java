package org.example.backend.repository;

import org.example.backend.dto.Quiz.SimpleQuizDTO;
import org.example.backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, UUID> {

    Optional<Quiz> findByTitle(String title);

    boolean existsByTitleAndIdNot(String title, UUID id);

    @Query("SELECT new org.example.backend.dto.Quiz.SimpleQuizDTO(q.id, q.title, q.description, size(q.questions)) FROM Quiz q ORDER BY q.title")
    List<SimpleQuizDTO> findAllSimple();
}