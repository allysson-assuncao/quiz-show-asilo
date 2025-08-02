import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {fetchMostFailedQuestions} from "@/services/reportService";
import {useQuery} from "react-query";

export function MostFailedQuestions({quizId}: { quizId: string }) {
    const {data: questions, isLoading} = useQuery({
        queryKey: ['mostFailedQuestions', quizId],
        queryFn: () => fetchMostFailedQuestions(quizId),
        enabled: !!quizId,
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Perguntas com Mais Erros</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-4/5"/>
                        <Skeleton className="h-5 w-3/5"/>
                        <Skeleton className="h-5 w-2/5"/>
                    </div>
                )}
                {!isLoading && (!questions || questions.length === 0) && (
                    <p className="text-sm text-muted-foreground">Não há dados de erros para este quiz.</p>
                )}
                <ol className="list-decimal list-inside space-y-2">
                    {questions?.map(q => (
                        <li key={q.questionText}>
                            <span className="font-medium">{q.questionText}</span>
                            <span className="text-sm text-muted-foreground"> - {q.errorCount} erro(s)</span>
                        </li>
                    ))}
                </ol>
            </CardContent>
        </Card>
    );
}
