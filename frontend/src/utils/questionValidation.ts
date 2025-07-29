import {z} from "zod";
import {choiceSchema} from "@/utils/choiceValidation";

export const questionFormSchema = z.object({
  text: z.string().min(5, { message: "A pergunta deve ter no mínimo 5 caracteres." }),
  choices: z.array(choiceSchema)
    .min(2, { message: "A pergunta deve ter no mínimo 2 alternativas." })
    .refine((choices) => choices.some(choice => choice.isCorrect), {
        message: "Pelo menos uma alternativa deve ser marcada como correta.",
        path: ["choices"],
    }),
});

export type QuestionFormData = z.infer<typeof questionFormSchema>;
