import { API_URL } from "@/lib/constants";
import type { Todo } from "@/type";

export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  const res = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });

  if (!res.ok) throw new Error("Update Todo Failed");

  const data: Todo = await res.json();
  return data;
}
