"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

import { QuizFormData, quizFormSchema } from "@/lib/validators/quizValidator";
import { createQuiz, updateQuiz } from "@/services/quizService";
import { QuizDetailDTO } from "@/model/Interfaces";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { QuestionCombobox } from "@/components/quiz/QuestionCombobox";

interface AddQuizFormProps {
    initialData?: QuizDetailDTO;
    onSuccessAction: () => void;
}

export function AddQuizForm({ initialData, onSuccessAction }: AddQuizFormProps) {
    const queryClient = useQueryClient();
    const isEditMode = !!initialData;

    const form = useForm<QuizFormData>({
        resolver: zodResolver(quizFormSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            questionIds: initialData?.questions.map(q => q.id) || [],
        },
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: QuizFormData) => {
            if (isEditMode) {
                return updateQuiz({ quizId: initialData.id, data });
            }
            return createQuiz(data);
        },
        onSuccess: () => {
            toast.success(isEditMode ? "Quiz atualizado com sucesso!" : "Quiz criado com sucesso!");
            queryClient.invalidateQueries(['simpleQuizzes']);
            onSuccessAction();
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || (isEditMode ? "Erro ao atualizar o quiz." : "Erro ao criar o quiz.");
            toast.error(errorMessage);
        },
    });

    const onSubmit = (data: QuizFormData) => {
        mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
                <h2 className="text-2xl font-bold text-center">{isEditMode ? "Editar Quiz" : "Criar Novo Quiz"}</h2>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Quiz de Conhecimentos Gerais" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição (Opcional)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Uma breve descrição sobre o quiz" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="questionIds"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perguntas</FormLabel>
                            <FormControl>
                                <QuestionCombobox
                                    selectedQuestionIds={field.value}
                                    onSelectionChangeAction={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Salvando..." : (isEditMode ? "Salvar Alterações" : "Criar Quiz")}
                </Button>
            </form>
        </Form>
    );
}