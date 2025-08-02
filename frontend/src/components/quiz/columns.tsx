"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SimpleQuizDTO } from "@/model/Interfaces"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CellActions } from "./CellActions" // Importamos o novo componente

export const columns: ColumnDef<SimpleQuizDTO>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Título
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "description",
        header: "Descrição",
        cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("description")}</div>,
    },
    {
        accessorKey: "questionCount",
        header: () => <div className="text-center">Nº de Perguntas</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("questionCount")}</div>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const quiz = row.original;
            return (
                <div className="text-right">
                    <CellActions quiz={quiz} />
                </div>
            )
        },
    },
]