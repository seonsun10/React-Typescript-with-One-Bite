import { deleteTodo } from "@/api/delete-todos";
import { QUERY_KEY } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deletedTodo) => {
      // 삭제할 Todo 정보를 캐시데이터에서 삭제
      queryClient.removeQueries({
        queryKey: QUERY_KEY.todo.detail(deletedTodo.id),
      });

      // list 캐시 데이터에서도 삭제할 id빼고 새로 등록
      queryClient.setQueryData<string[]>(QUERY_KEY.todo.list, (prevTodoIds) => {
        if (!prevTodoIds) return [];
        return prevTodoIds.filter((id) => id !== deletedTodo.id);
      });
    },
  });
}
