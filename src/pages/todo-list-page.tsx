import TodoEitor from "@/components/todo-list/todo-editer";
import TodoItem from "@/components/todo-list/todo-item";
import { useTodos } from "@/store/todos";

export default function TodoListPage() {
  const todos = useTodos();
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <TodoEitor />
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
