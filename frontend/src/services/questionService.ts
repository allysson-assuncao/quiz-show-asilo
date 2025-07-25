import {question} from "@/services/index";
import {QuestionFormData} from "@/model/FormData";
import {SimpleQuestion} from "@/model/Interfaces";

export const createQuestionRequest = async (data: QuestionFormData) => {
    const response = await question.post('/register', data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    console.log(response.data)
    return response.data;
};

export const fetchAllSimpleQuestions = async (): Promise<SimpleQuestion[]> => {
    const response = await question.get('/select-all-simple', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};
