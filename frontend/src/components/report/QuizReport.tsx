import {SimpleQuizDTO} from "@/model/Interfaces";
import {useQuery} from "react-query";
import {useState} from "react";
import {fetchAllSimpleQuizzes} from "@/services/quizService";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {QuizReportMetricsDisplay} from "@/components/report/QuizReportMetricsDisplay";
import {QuizReportRank} from "@/components/report/QuizReportRank";

export default function QuizReport() {
    const [selectedQuizId, setSelectedQuizId] = useState<string>('');

    const {data: quizzes = [], isLoading: isLoadingQuizzes} = useQuery<SimpleQuizDTO[]>({
        queryKey: ['simpleQuizzes'],
        queryFn: fetchAllSimpleQuizzes,
    });

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Relatório de Resultados</h1>
                <Select onValueChange={setSelectedQuizId} defaultValue={selectedQuizId}>
                    <SelectTrigger className="w-full md:w-[280px]">
                        <SelectValue placeholder={isLoadingQuizzes ? "Carregando..." : "Selecione um quiz"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {quizzes.map(quiz => (
                            <SelectItem key={quiz.id} value={quiz.id}>{quiz.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {selectedQuizId ? (
                <div className="space-y-8">
                    <QuizReportMetricsDisplay quizId={selectedQuizId}/>
                    <QuizReportRank quizId={selectedQuizId}/>
                </div>
            ) : (
                <div className="text-center text-muted-foreground mt-20">
                    <p>Por favor, selecione um quiz para ver o relatório.</p>
                </div>
            )}
        </div>
    );
}
