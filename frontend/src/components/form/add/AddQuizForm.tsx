import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const QUESTIONS = [
  { id: 1, text: "Qual a capital da França?" },
  { id: 2, text: "Quem escreveu Dom Quixote?" },
  { id: 3, text: "Qual o maior planeta do sistema solar?" },
];

export function AddQuizForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      questions: [],
    },
  });

  return (
    <div className="flex flex-col items-center mt-10 space-y-8 md:space-y-6">
      <Card className="w-full md:max-w-[467px] lg:max-w-[600px] mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Novo Quiz</CardTitle>
          <CardDescription>
            Escolha as perguntas que irão compor seu quiz
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Digite o título do quiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full border rounded-md p-2 min-h-[120px] resize-y text-black"
                        placeholder="Digite a descrição do quiz"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="questions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perguntas</FormLabel>
                    <div className="overflow-x-auto rounded-md border mt-2">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selecionar</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pergunta</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {QUESTIONS.map((q) => (
                            <tr key={q.id}>
                              <td className="px-4 py-2">
                                <input
                                  type="checkbox"
                                  checked={field.value.includes(q.id)}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      field.onChange([...field.value, q.id]);
                                    } else {
                                      field.onChange(field.value.filter((id: number) => id !== q.id));
                                    }
                                  }}
                                />
                              </td>
                              <td className="px-4 py-2 text-black">{q.text}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
