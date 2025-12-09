import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { QUERY_KEY } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: string, type: "LIST" | "DETAIL") {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEY.todo.detail(id),
    enabled: type === "DETAIL",
  });
}
