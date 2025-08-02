package org.example.backend.repository;

import org.example.backend.dto.Question.MostFailedQuestionsDTO;
import org.example.backend.dto.Question.SimpleQuestionDTO;
import org.example.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {

    @Query("SELECT new org.example.backend.dto.Question.SimpleQuestionDTO(q.id, q.text) FROM Question q ORDER BY q.text")
    List<SimpleQuestionDTO> findAllSimple();

    @Query("""
                SELECT new org.example.backend.dto.Question.MostFailedQuestionsDTO(a.question.text, COUNT(a.id))
                FROM Answer a
                WHERE a.result.quiz.id = :quizId AND a.isCorrect = false
                GROUP BY a.question.text
                ORDER BY COUNT(a.id) DESC
            """)
    List<MostFailedQuestionsDTO> findMostFailedQuestions(@Param("quizId") UUID quizId, Pageable pageable);

}
