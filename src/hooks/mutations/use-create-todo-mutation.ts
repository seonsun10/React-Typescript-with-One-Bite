import { createTodo } from "@/api/create-todo";
import { QUERY_KEY } from "@/lib/constants";
import type { Todo } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (newTodo) => {
      // 새로운 Todo정보를 캐시에 등록
      queryClient.setQueryData<Todo>(
        QUERY_KEY.todo.detail(newTodo.id),
        newTodo,
      );

      // 기존 Todo id 리스트에 새로운 id추가
      queryClient.setQueryData<string[]>(QUERY_KEY.todo.list, (prevTodoIds) => {
        if (!prevTodoIds) return [newTodo.id];
        return [...prevTodoIds, newTodo.id];
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
