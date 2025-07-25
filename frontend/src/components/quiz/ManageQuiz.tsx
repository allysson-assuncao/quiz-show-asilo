import {useState} from "react";
import {Button} from "@/components/ui/button";
import {AddQuizDialog} from "./AddQuizDialog";

export function ManageQuiz() {
    const [showCreateQuiz, setShowCreateQuiz] = useState(false);

    return (
        <div className="container w-full mx-auto p-4">
            <header className="items-center justify-between mb-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Quizzes</h1>
                <Button onClick={() => setShowCreateQuiz(true)}>
                    CRIAR NOVO QUIZ
                </Button>
            </header>
            <AddQuizDialog open={showCreateQuiz} onOpenChange={setShowCreateQuiz}/>
        </div>
    );
}
