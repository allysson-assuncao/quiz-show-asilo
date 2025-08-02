import React from "react";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {fetchAllSimpleQuestions} from "@/services/questionService";
import {QuizFormData, quizFormSchema} from "@/utils/quizValidation";
import {zodResolver} from "@hookform/resolvers/zod";
import {createQuizRequest} from "@/services/quizService";
import {toast} from "sonner";
import {AxiosError} from "axios";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Badge} from "@/components/ui/badge";
import {Icons} from "@/public/icons";

export function AddQuizForm() {
    const queryClient = useQueryClient();

    const {data: questions = [], isLoading: isLoadingQuestions} = useQuery({
        queryKey: ['simpleQuestions'],
        queryFn: fetchAllSimpleQuestions,
    });

    const form = useForm<QuizFormData>({
        resolver: zodResolver(quizFormSchema),
        defaultValues: {
            title: "",
            description: "",
            questionIds: [],
        },
        mode: 'onBlur',
    });

    const mutation = useMutation({
        mutationFn: createQuizRequest,
        onSuccess: () => {
            toast.success("Quiz criado com sucesso!");
            queryClient.invalidateQueries({queryKey: ['quizzes']});
        },
        onError: (error) => {
            const errorMessage = error instanceof AxiosError
                ? error.response?.data?.message
                : "Ocorreu um erro inesperado.";
            toast.error("Erro ao criar quiz", {description: errorMessage});
        },
    });

    const onSubmit = (data: QuizFormData) => {
        mutation.mutate(data);
    };

    const selectedQuestionTexts = form.watch('questionIds').map(id =>
        questions.find(q => q.id === id)?.text
    ).filter(Boolean);

    return (
        <Card className="border-0 shadow-none">
            <CardHeader>
                <CardTitle className="text-2xl">Novo Quiz</CardTitle>
                <CardDescription>Preencha os dados e selecione as perguntas.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl><Input
                                        placeholder="Ex: Conhecimentos Gerais" {...field} /></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl><Textarea
                                        placeholder="Uma breve descrição sobre o quiz (opcional)" {...field} /></FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="questionIds"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Perguntas</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn("w-full justify-between", !field.value.length && "text-muted-foreground")}
                                                >
                                                    {field.value.length > 0
                                                        ? `${field.value.length} pergunta(s) selecionada(s)`
                                                        : "Selecione as perguntas"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                                            <Command>
                                                <CommandInput placeholder="Buscar pergunta..."/>
                                                <CommandList>
                                                    <CommandEmpty>Nenhuma pergunta encontrada.</CommandEmpty>
                                                    <CommandGroup>
                                                        {questions.map((question) => (
                                                            <CommandItem
                                                                key={question.id}
                                                                value={question.text}
                                                                onSelect={() => {
                                                                    const newValue = field.value.includes(question.id)
                                                                        ? field.value.filter((id) => id !== question.id)
                                                                        : [...field.value, question.id];
                                                                    field.onChange(newValue);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn("mr-2 h-4 w-4", field.value.includes(question.id) ? "opacity-100" : "opacity-0")}
                                                                />
                                                                {question.text}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        {isLoadingQuestions ? "Carregando perguntas..." : "Clique para ver e selecionar as perguntas disponíveis."}
                                    </FormDescription>
                                    <div className="flex flex-wrap gap-1 pt-2">
                                        {selectedQuestionTexts.map(text =>
                                            <Badge key={text}
                                                   variant="secondary">{text}
                                            </Badge>)}
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={mutation.isLoading}>
                                {mutation.isLoading ? <Icons.spinner className="animate-spin"/> : 'Salvar Quiz'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
