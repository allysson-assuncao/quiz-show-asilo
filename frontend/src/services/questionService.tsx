import {QuestionRequest} from "@/model/Interfaces";
import {question} from "@/services/index";

export const createQuestionRequest = async (data: QuestionRequest) => {
  const response = await question.post('/register', data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(response.data)
    return response.data;
};