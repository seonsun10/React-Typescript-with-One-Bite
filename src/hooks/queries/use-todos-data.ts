import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEY } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useTodosData() {
  return useQuery({
    queryFn: fetchTodos,
    queryKey: QUERY_KEY.todo.list,
  });
}
