package org.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Table(name = "quiz")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Quiz {
    @Id
    @Column(name = "id", nullable = false, unique = true, updatable = false, columnDefinition = "VARCHAR(36)")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "title", nullable = false, unique = true)
    private String title;

    @Column(name = "description")
    private String description;

    @ManyToMany
    @JoinTable(
        name = "quiz_question",
        joinColumns = @JoinColumn(name = "quiz_id"),
        inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    private Set<Question> questions;

    @OneToMany(mappedBy = "quiz", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Result> result;

}
