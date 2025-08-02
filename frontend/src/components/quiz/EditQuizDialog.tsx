"use client";

import { useQuery } from "react-query";
import { fetchQuizDetails } from "@/services/quizService";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { AddQuizForm } from "@/components/form/add/AddQuizForm";
import { Skeleton } from "@/components/ui/skeleton";

interface EditQuizDialogProps {
    quizId: string;
    open: boolean;
    onOpenChangeAction: (open: boolean) => void;
}

export function EditQuizDialog({ quizId, open, onOpenChangeAction }: EditQuizDialogProps) {
    const { data: quizDetails, isLoading, isError } = useQuery({
        queryKey: ['quizDetails', quizId],
        queryFn: () => fetchQuizDetails(quizId),
        enabled: open, // Só busca os dados quando o diálogo está aberto
    });

    return (
        <Drawer open={open} onOpenChange={onOpenChangeAction}>
            <DrawerContent>
                {isLoading && <div className="p-8 space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-24 w-full" /></div>}
                {isError && <p className="p-8 text-center text-red-500">Erro ao carregar os dados do quiz.</p>}
                {quizDetails && <AddQuizForm initialData={quizDetails} onSuccessAction={() => onOpenChangeAction(false)} />}
            </DrawerContent>
        </Drawer>
    );
}