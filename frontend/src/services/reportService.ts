import {report} from "@/services/index";
import {PagedResponse, QuizMetrics, QuizRankingEntry} from "@/model/Interfaces";

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
