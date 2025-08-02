import {useMutation, useQueryClient} from "react-query";
import {useFieldArray, useForm} from "react-hook-form";
import {QuestionFormData, questionFormSchema} from "@/utils/questionValidation";
import {zodResolver} from "@hookform/resolvers/zod";
import {createQuestionRequest, editQuestionRequest} from "@/services/questionService";
import {toast} from "sonner";
import {AxiosError} from "axios";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import {Icons} from "@/public/icons";
import {EditQuestionFormData} from "@/model/FormData";

import {useEffect, useState} from "react";
import {fetchEditableQuestion} from "@/services/questionService";

export function EditQuestionForm({ questionId }: { questionId: string }) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(true);
    const [fetchedData, setFetchedData] = useState<EditQuestionFormData | null>(null);

    const form = useForm<EditQuestionFormData>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: {
            questionId: questionId,
            text: "",
            choices: [
                {text: "", isCorrect: false},
                {text: "", isCorrect: false},
            ],
        },
        mode: 'onBlur',
    });

    useEffect(() => {
        if (!questionId) return;
        setLoading(true);
        setFetchedData(null);
        async function fetchData() {
            try {
                const data = await fetchEditableQuestion({ questionId });
                setFetchedData(data);
                form.reset(data);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionId]);

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "choices",
    });

    const mutation = useMutation({
        mutationFn: editQuestionRequest,
        onSuccess: () => {
            toast.success("Pergunta editada com sucesso!");
            queryClient.invalidateQueries({queryKey: ['questions']});
        },
        onError: (error) => {
            const errorMessage = error instanceof AxiosError
                ? error.response?.data?.message
                : "Ocorreu um erro inesperado.";
            toast.error("Erro ao editar pergunta", {description: errorMessage});
        },
    });

    const onSubmit = (data: QuestionFormData) => {
        mutation.mutate(data);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Icons.spinner className="animate-spin w-8 h-8 text-muted-foreground" />
                <span className="ml-2">Carregando pergunta...</span>
            </div>
        );
    }

    if (!fetchedData) {
        return (
            <div className="flex items-center justify-center min-h-[200px] text-destructive">
                Não foi possível carregar os dados da pergunta.
            </div>
        );
    }

    return (
        <Card className="m-12">
            <CardHeader>
                <CardTitle>Editar Pergunta</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Texto da Pergunta</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ex: Qual é a capital do Brasil?" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Separator/>
                        <div className="space-y-4">
                            <FormLabel>Alternativas</FormLabel>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-4 p-4 border rounded-md">
                                    <div className="flex-1 space-y-2">
                                        <FormField
                                            control={form.control}
                                            name={`choices.${index}.text`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder={`Alternativa ${index + 1}`} {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`choices.${index}.isCorrect`}
                                            render={({field}) => (
                                                <FormItem className="flex flex-row items-center justify-start gap-3">
                                                    <FormControl>
                                                        <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                                    </FormControl>
                                                    <FormLabel className="!mt-0 text-sm font-normal">
                                                        É a alternativa correta?
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {fields.length > 2 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            className="ml-auto"
                                        >
                                            ✕
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {form.formState.errors.choices && (
                                <p className="text-sm font-medium text-destructive">
                                    {form.formState.errors.choices.message || form.formState.errors.choices.root?.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append({text: "", isCorrect: false})}
                                className="w-full"
                            >
                                Adicionar Alternativa
                            </Button>
                            <Button type="submit" disabled={mutation.isLoading} className="w-full">
                                {mutation.isLoading ? <Icons.spinner className="animate-spin"/> : 'Salvar Pergunta'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
