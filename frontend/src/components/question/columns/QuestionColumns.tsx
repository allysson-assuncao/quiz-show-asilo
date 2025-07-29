import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { SimpleQuestion } from "@/model/Interfaces";

export const questionColumns = (
    handleEdit: (question: SimpleQuestion) => void,
    handleDelete: (questionId: string) => void
): ColumnDef<SimpleQuestion>[] => [
    {
        accessorKey: "text",
        header: "Question Text",
    },
    {
        id: "edit",
        header: "Edit",
        cell: ({ row }) => (
            <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(row.original)}
            >
                <Pencil className="h-4 w-4" />
            </Button>
        ),
    },
    {
        id: "delete",
        header: "Delete",
        cell: ({ row }) => (
            <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(row.original.id)}
            >
                <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
        ),
    },
];