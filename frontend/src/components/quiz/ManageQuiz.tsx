"use client"

import { useState } from "react"
import { useQuery } from "react-query"
import { Button } from "@/components/ui/button"
import { AddQuizDialog } from "./AddQuizDialog"
import { fetchAllSimpleQuizzes } from "@/services/quizService"
import { QuizDataTable } from "@/components/quiz/QuizDataTable"
import { columns } from "@/components/quiz/columns"
import { Skeleton } from "@/components/ui/skeleton"

export function ManageQuiz() {
    const [showCreateQuiz, setShowCreateQuiz] = useState(false);

    const { data: quizzes, isLoading, isError } = useQuery({
        queryKey: ['simpleQuizzes'],
        queryFn: fetchAllSimpleQuizzes
    });

    return (
        <div className="container w-full mx-auto p-4">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Quizzes</h1>
                <Button onClick={() => setShowCreateQuiz(true)}>
                    CRIAR NOVO QUIZ
                </Button>
            </header>

            <main>
                {isLoading && (
                    <div className="rounded-md border p-4">
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </div>
                )}

                {isError && (
                    <div className="text-center text-red-500">
                        Ocorreu um erro ao buscar os quizzes.
                    </div>
                )}

                {quizzes && <QuizDataTable columns={columns} data={quizzes} />}
            </main>

            <AddQuizDialog open={showCreateQuiz} onOpenChange={setShowCreateQuiz} />
        </div>
    );
}