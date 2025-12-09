import { updateTodo } from "@/api/update-todo";
import { QUERY_KEY } from "@/lib/constants";
import type { Todo } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      // 이전에 진행중인 updatedTodo.id에 관련된 로직은 취소
      // - 먼저 실행되고 있는 로직이 있다면 아래 진행되는 낙관적 업데이트 후
      // - 이전 데이터로 덮여질 수 있기 때문에!
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY.todo.detail(updatedTodo.id),
      });

      // list를 호출할 때 만들었던 detail캐시에서 수정하기 전 상태의 todo정보를 가져옴
      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEY.todo.detail(updatedTodo.id),
      );

      // update할 Todo의 값에 updatedTodo값으로 덮어쓰기
      queryClient.setQueryData<Todo>(
        QUERY_KEY.todo.detail(updatedTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;
          return {
            ...prevTodo,
            ...updatedTodo,
          };
        },
      );

      // 이전의 Todo정보를 내보내는 이유는
      // onError나 onSettled에서 백업하기 위함
      return { prevTodo };
    },
    // 넘어온 prevTodo의 id값에 이전 Todo정보를 덮어쓰기
    onError: (error, variable, context) => {
      if (context && context.prevTodo) {
        queryClient.setQueryData<Todo>(
          QUERY_KEY.todo.detail(context.prevTodo.id),
          context.prevTodo,
        );
      }
    },
  });
}
