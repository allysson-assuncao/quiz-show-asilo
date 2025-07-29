'use client'

import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import {deleteQuestion, fetchQuestionsPage} from "@/services/questionService";
import { DataTableSkeleton } from "@/components/skeleton/DataTableSkeleton";
import { QuestionDataTable } from "./data-table/QuestionDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { SimpleQuestion } from "@/model/Interfaces";
import {boolean} from "zod";

const ManageQuestionTable = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const role = useSelector((state: RootState) => state.auth.role);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10); // Fixed page size for simplicity
    const [totalPages, setTotalPages] = useState(0);
    const [cachedPages, setCachedPages] = useState<{ [key: number]: SimpleQuestion[] }>({});
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
            setCachedPages((prev) => ({ ...prev, [page]: res.content }));
            return res.content;
        },
        {
            keepPreviousData: true,
            initialData: cachedPages[page] || undefined,
        },
    );

    const handleEdit = (question: SimpleQuestion) => {
        console.log("Editing question:", question);
        // Implement edit logic here
    };

    const handleDelete = async (questionId: string) => {
        console.log("Deleting question ID:", questionId);
        let success = await deleteQuestion({ questionId });
        if (success) {
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
                        console.log('Delete button clicked', row.original, row.original.id);
                        handleDelete(row.original.id);
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
                data={tableData || []}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default ManageQuestionTable;