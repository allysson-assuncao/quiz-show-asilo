export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    name: string;
    role: string;
    profilePicture: string;
}

export interface QuizFormData {
    title: string;
    description?: string;
    questionIds: string[];
}

export interface ChoiceFormData {
    choiceId: string;
    text: string;
    isCorrect: boolean;
}

export interface QuestionFormData {
    text: string;
    choices: ChoiceFormData[];
}

export interface EditChoiceFormData {
    choiceId: string | null;
    text: string;
    isCorrect: boolean;
}

export interface EditQuestionFormData {
    questionId: string;
    text: string;
    choices: EditChoiceFormData[];
}

export interface DeleteQuestionFormData {
    questionId: string;
}