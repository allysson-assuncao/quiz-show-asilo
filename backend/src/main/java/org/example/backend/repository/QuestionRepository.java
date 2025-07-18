package org.example.backend.repository;

import org.example.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface QuestionRepository extends JpaRepository<Question,Long>, JpaSpecificationExecutor<Question> {
}
