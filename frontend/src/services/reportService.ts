import {report} from "@/services/index";
import {
    MostFailedQuestion,
    PagedResponse,
    QuizMetrics,
    QuizRankingEntry,
    UserQuizAnswerCount
} from "@/model/Interfaces";

export const fetchQuizMetrics = async (quizId: string): Promise<QuizMetrics> => {
    const {data} = await report.get(`/quizzes/${quizId}/metrics`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return data;
};

export const fetchQuizRanking = async (quizId: string, page: number, size: number): Promise<PagedResponse<QuizRankingEntry>> => {
    const {data} = await report.get(`/quizzes/${quizId}/ranking`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        params: {page, size}
    });
    return data;
};

export const fetchMostFailedQuestions = async (quizId: string): Promise<MostFailedQuestion[]> => {
    const {data} = await report.get(`/quizzes/${quizId}/most-failed-questions`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
    return data;
};

export const fetchUserActivity = async (): Promise<UserQuizAnswerCount[]> => {
    const {data} = await report.get('/user-activity', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
    return data;
};

export const fetchTopScorerProfilePicturePath = async (quizId: string): Promise<string | null> => {
    const response = await report.get<string>(`/quizzes/${quizId}/top-scorer-picture-path`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'text',
    });
    return response.data;
};
