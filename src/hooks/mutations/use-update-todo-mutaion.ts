import { updateTodo } from "@/api/update-todo";
import { QUERY_KEY } from "@/lib/constants";
import type { Todo } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      //업데이트 후의 상태로 캐시를 업데이트 시켜야하기 때문에
      //이전에 진행중인 캐시를 업데이트할 수 있는 로직을 멈춘다.
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY.todo.list,
      });
      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEY.todo.list);

      queryClient.setQueryData<Todo[]>(QUERY_KEY.todo.list, (prevTodo) => {
        if (!prevTodo) return [];

        return prevTodo.map((item) =>
          item.id === updatedTodo.id ? { ...item, ...updatedTodo } : item,
        );
      });

      return {
        prevTodos,
      };
    },
    onError: (error, variable, context) => {
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEY.todo.list,
          context.prevTodos,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.todo.list,
      });
    },
  });
}
