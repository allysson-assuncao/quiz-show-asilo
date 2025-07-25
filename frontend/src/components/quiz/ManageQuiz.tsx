import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateQuiz } from "./CreateQuiz";

export function ManageQuiz() {
    const [showCreateQuiz, setShowCreateQuiz] = useState(false);

    return (
        <div className="container w-full mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">GERENCIAR QUIZZES</h1>
            <Button onClick={() => setShowCreateQuiz(true)}>
                CRIAR QUIZ
            </Button>
            <CreateQuiz open={showCreateQuiz} onOpenChange={setShowCreateQuiz} />
        </div>
    );
}
