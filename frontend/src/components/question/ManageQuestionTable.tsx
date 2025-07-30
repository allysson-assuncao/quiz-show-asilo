'use client'

import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import React, { useState } from "react";
import {deleteQuestion, fetchQuestionsPage} from "@/services/questionService";
import { DataTableSkeleton } from "@/components/skeleton/DataTableSkeleton";
import { QuestionDataTable } from "./data-table/QuestionDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { SimpleQuestion } from "@/model/Interfaces";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

const ManageQuestionTable = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const role = useSelector((state: RootState) => state.auth.role);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10); // Fixed page size for simplicity
    const [totalPages, setTotalPages] = useState(0);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { data: tableData, error: tableError, isLoading: isTableLoading } = useQuery(
        ['questions', page, pageSize],
        async () => {
            const res = await fetchQuestionsPage({
                page: page,
                size: pageSize,
                orderBy: 'text',
                direction: 'ASC'
            });
            setTotalPages(res.totalPages);
            return res.content;
        },
        {
            keepPreviousData: true,
        },
    );
    const [localTableData, setLocalTableData] = useState<SimpleQuestion[] | null>(null);

    // Sync localTableData with tableData when tableData changes
    React.useEffect(() => {
        setLocalTableData(tableData || []);
    }, [tableData]);

    const handleEdit = (question: SimpleQuestion) => {
        console.log("Editing question:", question);
        // Implement edit logic here
    };

    const handleDelete = async (id: string) => {
        setDeleteDialogOpen(false);
        setSelectedDeleteId(null);
        // Optimistically update UI
        setLocalTableData((prev) => prev ? prev.filter(q => q.id !== id) : prev);
        console.log("Deleting question ID:", id);
        const success = await deleteQuestion({ id });
        if (success) {
            queryClient.invalidateQueries(['questions']);
        } else {
            // If failed, refetch to restore
            queryClient.invalidateQueries(['questions']);
        }
    };

    const columns: ColumnDef<SimpleQuestion>[] = [
        {
            accessorKey: "text",
            header: "Texto da Pergunta",
            cell: ({ row }) => (
                <div className="max-w-md truncate">{row.getValue("text")}</div>
            ),
        },
        {
            id: "edit",
            header: "Editar",
            cell: ({ row }) => (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(row.original)}
                    aria-label="Editar pergunta"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            ),
        },
        {
            id: "delete",
            header: "Excluir",
            cell: ({ row }) => (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        setSelectedDeleteId(row.original.id);
                        setDeleteDialogOpen(true);
                    }}
                    aria-label="Excluir pergunta"
                >
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            ),
        },
    ];


    if (isTableLoading) return <DataTableSkeleton />;
    if (tableError) return <div>Error: {tableError.message}</div>;

    return (
        <div className={"container mx-auto py-10 w-full max-w-[1920px] 5xl:mx-auto 5xl:px-32"}>
            <QuestionDataTable
                columns={columns}
                data={localTableData || []}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar exclusão</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja excluir esta pergunta? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (selectedDeleteId) handleDelete(selectedDeleteId);
                            }}
                        >
                            Excluir
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageQuestionTable;