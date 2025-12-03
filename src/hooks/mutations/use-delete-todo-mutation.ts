import { deleteTodo } from "@/api/delete-todos";
import { QUERY_KEY } from "@/lib/constants";
import type { Todo } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deletedTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEY.todo.list, (prevTodos) => {
        if (!prevTodos) return [];

        return prevTodos.filter((prevTodo) => prevTodo.id !== deletedTodo.id);
      });
    },
  });
}
