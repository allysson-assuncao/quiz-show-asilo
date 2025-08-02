package org.example.backend.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.example.backend.dto.Choice.ChoiceEditRequestDTO;
import org.example.backend.dto.Choice.ChoiceRequestDTO;
import org.example.backend.dto.Question.QuestionDeleteRequestDTO;
import org.example.backend.dto.Question.QuestionEditRequestDTO;
import org.example.backend.dto.Question.QuestionRequestDTO;
import org.example.backend.dto.Question.SimpleQuestionDTO;
import org.example.backend.model.Choice;
import org.example.backend.model.Question;
import org.example.backend.repository.ChoiceRepository;
import org.example.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @PersistenceContext
    private EntityManager entityManager;

    private final QuestionRepository questionRepository;

    private final ChoiceRepository choiceRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, ChoiceRepository choiceRepository) {
        this.questionRepository = questionRepository;
        this.choiceRepository = choiceRepository;
    }

    @Transactional
    public Question createQuestion(QuestionRequestDTO requestDTO) {
        Question question = new Question();
        question.setText(requestDTO.text());
        question.setCreatedAt(LocalDateTime.now());

        Set<Choice> choices = requestDTO.choices().stream()
                .map(choiceDTO -> {
                    Choice choice = new Choice();
                    choice.setText(choiceDTO.text());
                    choice.setCorrect(choiceDTO.isCorrect());
                    choice.setQuestion(question);
                    return choice;
                })
                .collect(Collectors.toSet());

        question.setChoices(choices);

        return this.questionRepository.save(question);
    }

    @Transactional
    public Page<SimpleQuestionDTO> getAllPageableQuestions(int page,
                                                           int size,
                                                           String orderBy,
                                                           Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, orderBy));
        Page<Question> questionPage = questionRepository.findAll(pageable);

        List<UUID> questionIdsOnPage = questionPage.getContent().stream()
                .map(Question::getId)
                .toList();

        return questionPage.map(
                question -> new SimpleQuestionDTO(
                        question.getId(),
                        question.getText()
                )
        );
    }

    @Transactional
    public boolean updateQuestion(QuestionEditRequestDTO requestDTO) {
        if(questionRepository.existsById(requestDTO.questionId())) {
            Question question = questionRepository.findById(requestDTO.questionId()).get();
            question = Question.builder()
                    .updatedAt(LocalDateTime.now())
                    .choices(editChoices(requestDTO.choices()))
                    .build();
            questionRepository.updateQuestionByObject(question);
            return true;
        }else{
            return false;
        }
    }

    private Set<Choice> editChoices(List<ChoiceEditRequestDTO> requestDTOs) {
        Set<Choice> choices = new HashSet<>();

        for (ChoiceEditRequestDTO dto : requestDTOs) {
            if(choiceRepository.existsById(dto.choiceId())) {
                Choice choice = choiceRepository.findById(dto.choiceId()).get();
                choice.setText(dto.newText());
                choice.setCorrect(dto.isCorrect());

                choiceRepository.updateChoiceByObject(choice);

                choices.add(choice);

            }

        }

        return choices;
    }

    public QuestionEditRequestDTO getEditQuestionById(UUID id){
        if(!questionRepository.existsById(id)) return null;
        Question question = questionRepository.findById(id).get();
        QuestionEditRequestDTO dto = QuestionEditRequestDTO.builder()
                .questionId(question.getId())
                .newText(question.getText())
                .choices(question.getChoices().stream().map(this::convertToDTO).toList())
                .build();

        return dto;
    }

    private ChoiceEditRequestDTO convertToDTO(Choice choice) {
        return ChoiceEditRequestDTO.builder()
                .choiceId(choice.getId())
                .newText(choice.getText())
                .isCorrect(choice.isCorrect())
                .build();
    }

    @Transactional
    public boolean deleteQuestion(QuestionDeleteRequestDTO requestDTO) {
        UUID id = requestDTO.id();
        if (questionRepository.existsById(id)) {
            executeNativeDelete("DELETE FROM answer WHERE question_id = ?", id);
            executeNativeDelete("DELETE FROM answer_choices WHERE choice_id IN (SELECT questionId FROM choice WHERE question_id = ?)", id);
            executeNativeDelete("DELETE FROM quiz_question WHERE question_id = ?", id);
            executeNativeDelete("DELETE FROM choice WHERE question_id = ?", id);
            questionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private void executeNativeDelete(String query, UUID id) {
        entityManager.createNativeQuery(query)
                .setParameter(1, id)
                .executeUpdate();
    }

    public List<SimpleQuestionDTO> getAllSimpleQuestions() {
        return this.questionRepository.findAllSimple();
    }

}
