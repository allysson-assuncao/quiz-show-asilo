package org.example.backend.repository;

import org.example.backend.dto.Question.SimpleQuestionDTO;
import org.example.backend.model.Question;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {

    @Query("SELECT new org.example.backend.dto.Question.SimpleQuestionDTO(q.id, q.text) FROM Question q ORDER BY q.text")
    List<SimpleQuestionDTO> findAllSimple();


}
