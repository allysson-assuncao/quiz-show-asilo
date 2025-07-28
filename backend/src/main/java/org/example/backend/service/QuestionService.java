package org.example.backend.service;

import org.example.backend.dto.Question.QuestionRequestDTO;
import org.example.backend.dto.Question.SimpleQuestionDTO;
import org.example.backend.model.Choice;
import org.example.backend.model.Question;
import org.example.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Transactional
    public Question createQuestion(QuestionRequestDTO requestDTO) {
        Question question = new Question();
        question.setText(requestDTO.text());

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

    public List<SimpleQuestionDTO> getAllSimpleQuestions() {
        return this.questionRepository.findAllSimple();
    }

}
