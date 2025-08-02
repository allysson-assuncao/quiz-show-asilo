import { quiz } from "@/services/index";
import { QuizForTaking, SimpleQuizDTO, QuizDetailDTO } from "@/model/Interfaces";
import { QuizFormData } from "@/lib/validators/quizValidator";

// --- Funções de Leitura (Read) ---

export const fetchAllSimpleQuizzes = async (): Promise<SimpleQuizDTO[]> => {
    const response = await quiz.get('/simple-list');
    return response.data;
};

export const fetchQuizForTaking = async (quizId: string): Promise<QuizForTaking> => {
    const response = await quiz.get(`/${quizId}/take`);
    return response.data;
};

export const fetchQuizDetails = async (quizId: string): Promise<QuizDetailDTO> => {
    const response = await quiz.get(`/${quizId}/details`);
    return response.data;
};

// --- Funções de Escrita (Create, Update, Delete) ---

export const createQuiz = async (data: QuizFormData) => {
    const response = await quiz.post('/register', data);
    return response.data;
};

export const updateQuiz = async ({ quizId, data }: { quizId: string, data: QuizFormData }) => {
    const response = await quiz.put(`/${quizId}`, data);
    return response.data;
};

export const deleteQuiz = async (quizId: string) => {
    const response = await quiz.delete(`/${quizId}`);
    return response.data;
};