import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import {fetchQuizForTaking} from "@/services/quizService";
import {Skeleton} from "@/components/ui/skeleton";
import {QuizPlayer} from "@/components/quiz/QuizPlayer";

export default function TakeQuizPage() {
    const params = useParams();
    const quizId = params.quizId as string;

    const {data: quiz, isLoading, error} = useQuery({
        queryKey: ['quizForTaking', quizId],
        queryFn: () => fetchQuizForTaking(quizId),
        enabled: !!quizId,
    });

    if (isLoading) {
        return <div className="container p-4 space-y-4">
            <Skeleton className="h-12 w-1/2"/>
            <Skeleton className="h-64 w-full"/>
            <div className="flex justify-between">
                <Skeleton className="h-10 w-24"/>
                <Skeleton className="h-10 w-24"/>
            </div>
        </div>;
    }

    if (error || !quiz) {
        return <div className="text-center text-red-500 mt-10">Erro ao carregar o quiz. Tente novamente.</div>;
    }

    return <QuizPlayer quiz={quiz}/>;
}
