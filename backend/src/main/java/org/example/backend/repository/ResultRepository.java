package org.example.backend.repository;

import org.example.backend.dto.Quiz.QuizMetricsDTO;
import org.example.backend.model.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Map;
import java.util.UUID;

public interface ResultRepository extends JpaRepository<Result, Long> {

    @Query("""
                SELECT
                    new org.example.backend.dto.Quiz.QuizMetricsDTO(
                        (SELECT u.name FROM Result r_top JOIN r_top.user u WHERE r_top.quiz.id = :quizId ORDER BY r_top.score DESC, r_top.createdAt ASC LIMIT 1),
                        (SELECT MAX(r_max.score) FROM Result r_max WHERE r_max.quiz.id = :quizId),
                        AVG(r.score),
                        COUNT(r.id),
                        COUNT(DISTINCT r.user.id)
                    )
                FROM Result r
                WHERE r.quiz.id = :quizId
            """)
    QuizMetricsDTO getQuizMetrics(@Param("quizId") UUID quizId);

    @Query(value = """
                SELECT
                    RANK() OVER (ORDER BY r.score DESC, r.time_start ASC) as `rank`,
                    u.name as userName,
                    r.score,
                    r.time_start as completedAt
                FROM result r JOIN users u ON r.user_id = u.id
                WHERE r.quiz_id = :quizId
            """,
            countQuery = "SELECT COUNT(*) FROM result WHERE quiz_id = :quizId",
            nativeQuery = true)
    Page<Map<String, Object>> findQuizRanking(@Param("quizId") UUID quizId, Pageable pageable);

    @Modifying
    @Query("DELETE FROM Result r WHERE r.quiz.id = :quizId")
    void deleteByQuizId(@Param("quizId") UUID quizId);
}
