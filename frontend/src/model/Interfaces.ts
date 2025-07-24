export type UserRole = keyof typeof UserRoles;

export const UserRoles = {
    ADMIN: {value: 'ADMIN', label: 'Administrador'},
    CARETAKER: {value: 'CARETAKER', label: 'Cuidador'},
    RESIDENT: {value: 'RESIDENT', label: 'Residente'},
} as const

export interface ChoiceRequest {
  text: string;
  isCorrect: boolean;
}

export interface QuestionRequest {
  text:string;
  choices: ChoiceRequest[];
}
