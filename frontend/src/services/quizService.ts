import {QuizFormData} from "@/model/FormData";
import {quiz} from "@/services/index";

export const createQuizRequest = async (data: QuizFormData) => {
    const response = await quiz.post('/register', data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};