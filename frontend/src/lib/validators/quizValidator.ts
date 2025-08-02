import { z } from "zod";

export const quizFormSchema = z.object({
    title: z.string().min(3, { message: "O título deve ter no mínimo 3 caracteres." }),
    description: z.string().optional(),
    questionIds: z.array(z.string()).min(1, { message: "Selecione pelo menos uma pergunta." })
});

export type QuizFormData = z.infer<typeof quizFormSchema>;