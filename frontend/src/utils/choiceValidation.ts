import {z} from "zod";

export const choiceSchema = z.object({
    choiceId: z.string().uuid().nullable().optional(),
    text: z.string().min(1, "O texto da alternativa é obrigatório."),
    isCorrect: z.boolean(),
});
