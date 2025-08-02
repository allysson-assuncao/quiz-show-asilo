import {useState} from "react";
import {Button} from "@/components/ui/button";
import {AddQuestionDialog} from "@/components/question/AddQuestionDialog";
import ManageQuestionTable from "@/components/question/ManageQuestionTable";

export function ManageQuestion() {
    const [showCreateQuiz, setShowCreateQuiz] = useState(false);

    return (
        <div className="container w-full mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Perguntas</h1>
            <Button onClick={() => setShowCreateQuiz(true)}>
                Criar Pergunta
            </Button>
            <AddQuestionDialog open={showCreateQuiz} onOpenChange={setShowCreateQuiz} />
            <ManageQuestionTable/>
        </div>
    );
}
