export type UserRole = keyof typeof UserRoles;

export const UserRoles = {
    ADMIN: {value: 'ADMIN', label: 'Administrador'},
    CARETAKER: {value: 'CARETAKER', label: 'Cuidador'},
    RESIDENT: {value: 'RESIDENT', label: 'Residente'},
} as const
