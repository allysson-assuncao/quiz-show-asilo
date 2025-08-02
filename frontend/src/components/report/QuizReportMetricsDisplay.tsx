import {useQuery} from "react-query";
import {fetchQuizMetrics, fetchTopScorerProfilePicturePath} from "@/services/reportService";
import {BarChart, CheckSquare, Target, Trophy, Users} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export function QuizReportMetricsDisplay({quizId}: { quizId: string }) {
    const {data: metrics, isLoading} = useQuery({
        queryKey: ['quizMetrics', quizId],
        queryFn: () => fetchQuizMetrics(quizId),
        enabled: !!quizId,
    });

    const { data: topScorerImgPath, isLoading: isLoadingImg } = useQuery({
        queryKey: ['topScorerPicture', quizId],
        queryFn: () => fetchTopScorerProfilePicturePath(quizId),
        enabled: !!quizId,
    });

    const formatImageUrl = (path: string | null | undefined) => {
        if (!path) return '';
        return `${process.env.NEXT_PUBLIC_API_URL}/profile-pictures/${path}`;
    };

    const metricCards = [
        {
            title: "Melhor Pontuação",
            value: `${metrics?.topScore?.toFixed(1) ?? 'N/A'}%`,
            subtext: `por ${metrics?.topScorerName ?? '...'}`,
            icon: <Trophy className="h-4 w-4 text-muted-foreground"/>
        },
        {
            title: "Máximo de Acertos",
            value: metrics?.maxCorrectAnswers ?? '...',
            subtext: 'em uma única tentativa',
            icon: <CheckSquare className="h-4 w-4 text-muted-foreground"/>
        },
        {
            title: "Média de Pontuação",
            value: `${metrics?.averageScore?.toFixed(1) ?? '...'}%`,
            icon: <Target className="h-4 w-4 text-muted-foreground"/>
        },
        {
            title: "Total de Tentativas",
            value: metrics?.totalAttempts ?? '...',
            icon: <BarChart className="h-4 w-4 text-muted-foreground"/>
        },
        {
            title: "Participantes Únicos",
            value: metrics?.distinctParticipants ?? '...',
            icon: <Users className="h-4 w-4 text-muted-foreground"/>
        },
    ];

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({length: 5}).map((_, i) => <Skeleton key={i} className="h-32"/>)}
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {metricCards.map(card => (
                <Card key={card.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                        {card.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        {card.subtext && <p className="text-xs text-muted-foreground">{card.subtext}</p>}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
