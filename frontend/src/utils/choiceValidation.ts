import {z} from "zod";

export const choiceSchema = z.object({
  text: z.string().min(1, { message: "O texto da alternativa é obrigatório." }),
  isCorrect: z.boolean().default(false),
});