import {QuizFormData} from "@/model/FormData";
import {quiz} from "@/services/index";
import {QuizForTaking, SimpleQuiz} from "@/model/Interfaces";

export const createQuizRequest = async (data: QuizFormData) => {
    const response = await quiz.post('/register', data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const fetchQuizForTaking = async (quizId: string): Promise<QuizForTaking> => {
    const response = await quiz.get(`/${quizId}/take`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const fetchAllSimpleQuizzes = async (): Promise<SimpleQuiz[]> => {
    const response = await quiz.get('/select-all-simple', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};
