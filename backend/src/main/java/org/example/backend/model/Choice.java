package org.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Table(name = "choice")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Choice {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false, columnDefinition = "VARCHAR(36)")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "text", nullable = false, unique = true, updatable = false)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    @Column(name = "is_correct", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isCorrect;

    @ManyToMany(mappedBy = "choices", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Answer> answers;

}
