"use client";

import { useQuery } from "react-query";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { fetchAllSimpleQuestions } from "@/services/questionService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

interface QuestionComboboxProps {
    selectedQuestionIds: string[];
    onSelectionChangeAction: (ids: string[]) => void;
}

export function QuestionCombobox({ selectedQuestionIds, onSelectionChangeAction }: QuestionComboboxProps) {
    const [open, setOpen] = useState(false);
    const { data: allQuestions = [], isLoading } = useQuery({
        queryKey: ['simpleQuestions'],
        queryFn: fetchAllSimpleQuestions,
    });

    const handleSelect = (questionId: string) => {
        const newSelection = selectedQuestionIds.includes(questionId)
            ? selectedQuestionIds.filter(id => id !== questionId)
            : [...selectedQuestionIds, questionId];
        onSelectionChangeAction(newSelection);
    };

    const selectedQuestions = allQuestions.filter(q => selectedQuestionIds.includes(q.id));

    if (isLoading) {
        return <Skeleton className="h-10 w-full" />;
    }

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between h-auto"
                    >
                        <div className="flex gap-1 flex-wrap">
                            {selectedQuestions.length > 0 ? (
                                selectedQuestions.map(q => (
                                    <Badge variant="secondary" key={q.id}>{q.text}</Badge>
                                ))
                            ) : (
                                "Selecione as perguntas..."
                            )}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar pergunta..." />
                        <CommandList>
                            <CommandEmpty>Nenhuma pergunta encontrada.</CommandEmpty>
                            <CommandGroup>
                                {allQuestions.map((question) => (
                                    <CommandItem
                                        key={question.id}
                                        onSelect={() => handleSelect(question.id)}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedQuestionIds.includes(question.id) ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {question.text}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}