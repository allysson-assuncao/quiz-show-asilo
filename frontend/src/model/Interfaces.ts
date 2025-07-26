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
    choices: Choice[];
}

export interface QuizForTaking {
    id: string;
    title: string;
    questions: QuestionForTaking[];
}

export interface SimpleQuiz {
    id: string;
    title: string;
    description: string;
    questionCount: number;
}

export interface UserAnswer {
    questionId: string;
    choiceId: string;
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
