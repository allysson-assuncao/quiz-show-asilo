package org.example.backend.repository;

import org.example.backend.model.Choice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChoiceRepository extends JpaRepository<Choice, UUID> {

    @Modifying
    @Query(value = "UPDATE choice SET text = :text WHERE id = :id", nativeQuery = true)
    void updateChoiceText(@Param("id") UUID id, @Param("text") String text);

    @Modifying
    @Query(value = "UPDATE choice SET is_correct = :isCorrect WHERE id = :id", nativeQuery = true)
    void updateChoiceIsCorrect(@Param("id") UUID id, @Param("isCorrect") boolean isCorrect);

    default void updateChoiceByObject(Choice choice){
        updateChoiceText(choice.getId(), choice.getText());
        updateChoiceIsCorrect(choice.getId(), choice.isCorrect());
    }


}
