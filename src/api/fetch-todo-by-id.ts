import { API_URL } from "@/lib/constants";
import type { Todo } from "@/type";

export async function fetchTodoById(id: number) {
  const res = await fetch(`${API_URL}/todos/${id}`);
  if (!res.ok) throw new Error("Failed Fetch");

  const data: Todo = await res.json();
  return data;
}
