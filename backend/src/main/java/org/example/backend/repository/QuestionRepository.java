package org.example.backend.repository;

import org.example.backend.dto.Question.SimpleQuestionDTO;
import org.example.backend.model.Question;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {

    @Query("SELECT new org.example.backend.dto.Question.SimpleQuestionDTO(q.id, q.text) FROM Question q ORDER BY q.text")
    List<SimpleQuestionDTO> findAllSimple();

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE question SET text = :text, updated_at = :updatedAt WHERE id = :id", nativeQuery = true)
    void updateQuestionById(
            @Param("id") UUID id,
            @Param("text") String text,
            @Param("updatedAt") LocalDateTime updatedAt
    );

    default void updateQuestionByObject(Question question){
        updateQuestionById(question.getId(), question.getText(), question.getUpdatedAt());
    }

}
