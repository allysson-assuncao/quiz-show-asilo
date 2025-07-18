package org.example.backend.repository;

import org.example.backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface QuizRepository extends JpaRepository<Quiz,Long>, JpaSpecificationExecutor<Quiz> {

}
