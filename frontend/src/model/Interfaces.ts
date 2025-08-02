export type UserRole = keyof typeof UserRoles;

export const UserRoles = {
    ADMIN: {value: 'ADMIN', label: 'Administrador'},
    CARETAKER: {value: 'CARETAKER', label: 'Cuidador'},
    RESIDENT: {value: 'RESIDENT', label: 'Residente'},
} as const

export interface SimpleQuestion {
    id: string;
    text: string;
}

export interface Choice {
    id: string;
    text: string;
}

export interface QuestionForTaking {
    id: string;
    text: string;
    isMultipleChoice: boolean;
    choices: Choice[];
}

export interface QuizForTaking {
    id: string;
    title: string;
    questions: QuestionForTaking[];
}

export interface SimpleQuizDTO {
    id: string;
    title: string;
    description: string;
    questionCount: number;
}

export interface UserAnswer {
    questionId: string;
    choiceIds: string[];
}

export interface ResultRequest {
    quizId: string;
    userEmail: string;
    answers: UserAnswer[];
}

export interface ResultSummary {
    resultId: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    score: number;
}

export interface QuizRankingEntry {
    rank: number;
    userName: string;
    score: number;
    completedAt: string;
}

export interface QuizMetrics {
    topScorerName: string;
    topScore: number;
    averageScore: number;
    totalAttempts: number;
    distinctParticipants: number;
    maxCorrectAnswers: number;
}

export interface MostFailedQuestion {
    questionText: string;
    errorCount: number;
}

export interface UserQuizAnswerCount {
    userName: string;
    quizTitle: string;
    totalAnswers: number;
}

export interface PagedResponse<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    empty: boolean;
}


export interface FetchQuestionsPageResponse {
    content: SimpleQuestion[];
    totalPages: number;
}

export interface FetchQuestionsPageParams {
    page?: number;
    size?: number;
    orderBy?: string;
    direction?: 'ASC' | 'DESC';
}

export interface QuestionFilters{
    text?: string;
}

export interface QuizDetailDTO {
    id: string;
    title: string;
    description: string;
    questions: SimpleQuestion[]; // Reutiliza a interface SimpleQuestion que você já tem
}