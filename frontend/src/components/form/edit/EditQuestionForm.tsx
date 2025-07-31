import {useMutation, useQueryClient} from "react-query";
import {useFieldArray, useForm} from "react-hook-form";
import {QuestionFormData, questionFormSchema} from "@/utils/questionValidation";
import {zodResolver} from "@hookform/resolvers/zod";
import {createQuestionRequest} from "@/services/questionService";
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

export function EditQuestionForm() {
    const queryClient = useQueryClient();

    const form = useForm<QuestionFormData>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: {
            text: "",
            choices: [
                {text: "", isCorrect: false},
                {text: "", isCorrect: false},
            ],
        },
        mode: 'onBlur',
    });

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "choices",
    });

    const mutation = useMutation({
        mutationFn: createQuestionRequest,
        onSuccess: () => {
            toast.success("Pergunta cadastrada com sucesso!");
            queryClient.invalidateQueries({queryKey: ['questions']});
        },
        onError: (error) => {
            const errorMessage = error instanceof AxiosError
                ? error.response?.data?.message
                : "Ocorreu um erro inesperado.";
            toast.error("Erro ao cadastrar pergunta", {description: errorMessage});
        },
    });

    const onSubmit = (data: QuestionFormData) => {
        mutation.mutate(data);
    };

    return (
        <Card className="m-12">
            <CardHeader>
                <CardTitle>Cadastrar Nova Pergunta</CardTitle>
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
