import {useQuery} from "react-query";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {fetchAllSimpleQuizzes} from "@/services/quizService";

export default function QuizzesList() {
    const {data: quizzes, isLoading} = useQuery({
        queryKey: ['simpleQuizzes'],
        queryFn: fetchAllSimpleQuizzes
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Escolha um Quiz para Começar</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading && Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-48"/>)}
                {quizzes?.map(quiz => (
                    <Card key={quiz.id}>
                        <CardHeader>
                            <CardTitle>{quiz.title}</CardTitle>
                            <CardDescription>{quiz.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{quiz.questionCount} perguntas</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={`/dashboard/quizzes/${quiz.id}`}>Começar Agora</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
