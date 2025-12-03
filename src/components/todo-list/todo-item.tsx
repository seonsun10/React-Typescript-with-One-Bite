import { Link } from "react-router";
import { Button } from "../ui/button";
import type { Todo } from "@/type";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutaion";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate: updateMutate } = useUpdateTodoMutation();
  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteTodoMutation();
  const handleDeleteClick = () => {
    deleteMutate(id);
  };

  const handleCheckboxClick = () => {
    updateMutate({
      id,
      isDone: !isDone,
    });
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type={"checkbox"}
          checked={isDone}
          onClick={handleCheckboxClick}
          disabled={isDeletePending}
        />
        <Link to={`/todo/${id}`}>{content}</Link>
      </div>
      <Button
        disabled={isDeletePending}
        onClick={handleDeleteClick}
        variant={"destructive"}
      >
        삭제
      </Button>
    </div>
  );
}
