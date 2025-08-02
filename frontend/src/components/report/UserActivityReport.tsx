import {useQuery} from "react-query";
import {fetchUserActivity} from "@/services/reportService";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";

export function UserActivityReport() {
    const {data: activityData, isLoading} = useQuery({
        queryKey: ['userActivityReport'],
        queryFn: fetchUserActivity
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Relatório de Atividade Geral</CardTitle>
                <CardDescription>
                    Total de respostas por usuário em cada quiz, ordenado pela maior atividade.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuário</TableHead>
                                <TableHead>Quiz</TableHead>
                                <TableHead className="text-right">Total de Respostas</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && Array.from({length: 3}).map((_, i) => (
                                <TableRow key={`activity-skeleton-${i}`}>
                                    <TableCell><Skeleton className="h-5 w-24"/></TableCell>
                                    <TableCell><Skeleton className="h-5 w-40"/></TableCell>
                                    <TableCell className="text-right"><Skeleton
                                        className="h-5 w-12 ml-auto"/></TableCell>
                                </TableRow>
                            ))}
                            {!isLoading && activityData?.map((activity, index) => (
                                <TableRow key={`${activity.userName}-${activity.quizTitle}-${index}`}>
                                    <TableCell className="font-medium">{activity.userName}</TableCell>
                                    <TableCell>{activity.quizTitle}</TableCell>
                                    <TableCell className="text-right">{activity.totalAnswers}</TableCell>
                                </TableRow>
                            ))}
                            {!isLoading && (!activityData || activityData.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        Nenhuma atividade registrada.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
