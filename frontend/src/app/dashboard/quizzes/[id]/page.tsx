'use client'

import TakeQuiz from "@/components/quiz/TakeQuiz";

function TakeQuizPage({
                             params,
                         }: {
    params: { id: string };
}) {
    return (
        <div className="h-full">
            <TakeQuiz quizId={params.id} />
        </div>
    )
}

export default TakeQuizPage