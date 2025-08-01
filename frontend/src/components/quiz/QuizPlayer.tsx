import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useState} from "react";
import {QuizForTaking, ResultRequest, ResultSummary, UserAnswer} from "@/model/Interfaces";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useMutation} from "react-query";
import {submitResultRequest} from "@/services/resultService";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Icons} from "@/public/icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Checkbox} from "@/components/ui/checkbox";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

interface QuizPlayerProps {
    quiz: QuizForTaking;
}

export function QuizPlayer({quiz}: QuizPlayerProps) {
    const router = useRouter();
    const userEmail = useSelector((state: RootState) => state.auth.email);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string[]>>({});
    const [showResultDialog, setShowResultDialog] = useState(false);
    const [resultSummary, setResultSummary] = useState<ResultSummary | null>(null);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    const isAnswered = answers[currentQuestion.id] && answers[currentQuestion.id].length > 0;

    const mutation = useMutation({
        mutationFn: submitResultRequest,
        onSuccess: (summary) => {
            setResultSummary(summary);
            setShowResultDialog(true);
            toast.success("Quiz finalizado! Confira seu resultado.");
        },
        onError: () => {
            toast.error("Houve um erro ao enviar suas respostas. Tente novamente.");
        }
    });

    const handleSelectChoice = (choiceId: string) => {
        const questionId = currentQuestion.id;

        if (currentQuestion.isMultipleChoice) {
            const currentChoices = answers[questionId] || [];
            const newChoices = currentChoices.includes(choiceId)
                ? currentChoices.filter(id => id !== choiceId)
                : [...currentChoices, choiceId];
            setAnswers(prev => ({...prev, [questionId]: newChoices}));
        } else {
            setAnswers(prev => ({...prev, [questionId]: [choiceId]}));
        }
    };

    const handleFinish = () => {
        if (!userEmail) {
            toast.error("Usuário não identificado. Faça login para salvar seu resultado.");
            return;
        }
        const finalAnswers: UserAnswer[] = Object.entries(answers).map(([questionId, choiceIds]) => ({
            questionId,
            choiceIds
        }));
        const requestPayload: ResultRequest = {
            quizId: quiz.id,
            userEmail,
            answers: finalAnswers
        };
        mutation.mutate(requestPayload);
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardDescription>Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}</CardDescription>
                    <CardTitle className="text-2xl">{currentQuestion.text}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {currentQuestion.isMultipleChoice && (
                        <p className="text-sm text-center text-muted-foreground p-2 bg-secondary rounded-md">
                            Esta pergunta permite múltiplas respostas. Selecione todas as corretas.
                        </p>
                    )}
                    {currentQuestion.choices.map(choice => (
                        <div
                            key={choice.id}
                            className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-muted cursor-pointer"
                            onClick={() => handleSelectChoice(choice.id)}
                        >
                            {currentQuestion.isMultipleChoice ? (
                                <Checkbox
                                    id={choice.id}
                                    checked={answers[currentQuestion.id]?.includes(choice.id)}
                                />
                            ) : (
                                <RadioGroup value={answers[currentQuestion.id]?.[0]}>
                                    <RadioGroupItem value={choice.id} id={choice.id}/>
                                </RadioGroup>
                            )}
                            <label htmlFor={choice.id} className="font-medium flex-1 cursor-pointer">
                                {choice.text}
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="flex justify-between w-full max-w-2xl mt-6">
                <Button
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    disabled={isFirstQuestion}
                >
                    Anterior
                </Button>
                {isLastQuestion ? (
                    <Button onClick={handleFinish} disabled={!isAnswered || mutation.isLoading}>
                        {mutation.isLoading ? <Icons.spinner className="animate-spin"/> : "Finalizar"}
                    </Button>
                ) : (
                    <Button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        disabled={!isAnswered}
                    >
                        Próxima
                    </Button>
                )}
            </div>

            <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Resultado do Quiz: {quiz.title}</DialogTitle>
                        <DialogDescription>Parabéns por concluir o quiz! Aqui está o seu desempenho:</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 my-4 text-center">
                        <div className="p-4 bg-secondary rounded-lg">
                            <p className="text-2xl font-bold">{resultSummary?.correctAnswers}</p>
                            <p className="text-sm text-muted-foreground">Acertos</p>
                        </div>
                        <div className="p-4 bg-secondary rounded-lg">
                            <p className="text-2xl font-bold">{resultSummary?.wrongAnswers}</p>
                            <p className="text-sm text-muted-foreground">Erros</p>
                        </div>
                        <div className="col-span-2 p-4 bg-primary text-primary-foreground rounded-lg">
                            <p className="text-3xl font-bold">{resultSummary?.score.toFixed(1)}%</p>
                            <p className="text-sm">Pontuação Final</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => router.push('/dashboard/take-quiz')} className="w-full">
                            Ver outros quizzes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
