"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { SimpleQuizDTO } from "@/model/Interfaces";
import { deleteQuiz } from "@/services/quizService";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EditQuizDialog } from "./EditQuizDialog";

interface CellActionsProps {
    quiz: SimpleQuizDTO;
}

export function CellActions({ quiz }: CellActionsProps) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
        mutationFn: () => deleteQuiz(quiz.id),
        onSuccess: () => {
            toast.success(`Quiz '${quiz.title}' foi excluído com sucesso!`);
            queryClient.invalidateQueries(['simpleQuizzes']);
        },
        onError: () => {
            toast.error("Ocorreu um erro ao excluir o quiz. Tente novamente.");
        },
    });

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-500"
                        onClick={() => setIsAlertOpen(true)}
                    >
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Diálogo de Exclusão */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso irá excluir permanentemente o quiz
                            <span className="font-medium"> &ldquo;{quiz.title}&rdquo;</span> e todos os seus dados associados.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMutate()} disabled={isDeleting}>
                            {isDeleting ? "Excluindo..." : "Sim, excluir"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Diálogo de Edição */}
            {isEditDialogOpen && (
                <EditQuizDialog
                    quizId={quiz.id}
                    open={isEditDialogOpen}
                    onOpenChangeAction={setIsEditDialogOpen}
                />
            )}
        </>
    );
}