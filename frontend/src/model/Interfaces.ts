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