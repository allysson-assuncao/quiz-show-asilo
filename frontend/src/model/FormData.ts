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
}

export interface QuizFormData {
  title: string;
  description?: string;
  questionIds: string[];
}

export interface ChoiceFormData {
  text: string;
  isCorrect: boolean;
}

export interface QuestionFormData {
  text:string;
  choices: ChoiceFormData[];
}
