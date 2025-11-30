import type { Todo } from "@/type";
import { API_URL } from "@/lib/constants";

export async function fetchTodos() {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) {
    throw new Error("fetch failed");
  }

  const data: Todo[] = await res.json();
  return data;
}