import { useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {useQuery} from "react-query";
import {fetchQuizRanking} from "@/services/reportService";
import {QuizRankingEntry} from "@/model/Interfaces";

export function QuizReportRank({ quizId }: { quizId: string }) {
    const [page, setPage] = useState(0);
    const [pageSize] = useState(10);

    const { data: pagedData, isLoading } = useQuery({
        queryKey: ['quizRanking', quizId, page, pageSize],
        queryFn: () => fetchQuizRanking(quizId, page, pageSize),
        enabled: !!quizId,
        keepPreviousData: true,
    });

    const columns: ColumnDef<QuizRankingEntry>[] = [
        { accessorKey: "rank", header: "#" },
        { accessorKey: "userName", header: "Usuário" },
        { accessorKey: "score", header: "Pontuação", cell: ({ row }) => `${row.original.score.toFixed(1)}%` },
        { accessorKey: "completedAt", header: "Data", cell: ({ row }) => new Date(row.original.completedAt).toLocaleDateString('pt-BR') },
    ];

    const table = useReactTable({
        data: pagedData?.content ?? [],
        columns,
        manualPagination: true,
        rowCount: pagedData?.totalElements,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Ranking de Desempenho</h2>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    {/*{columns.map(col => <TableCell key={`${col.accessorKey}-${i}`}><Skeleton className="h-6" /></TableCell>)}*/}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nenhum resultado encontrado para este quiz.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button onClick={() => setPage(p => p - 1)} disabled={page === 0}>
                    Anterior
                </Button>
                <span className="text-sm">Página {page + 1} de {pagedData?.totalPages ?? 1}</span>
                <Button onClick={() => setPage(p => p + 1)} disabled={page >= (pagedData?.totalPages ?? 1) - 1}>
                    Próxima
                </Button>
            </div>
        </div>
    );
}