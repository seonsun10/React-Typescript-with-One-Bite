import { Link } from "react-router";
import { Button } from "../ui/button";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutaion";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";
import { useTodoDataById } from "@/hooks/queries/use-todo-by-id";

export default function TodoItem({ id }: { id: string }) {
  // LIST에서 호출하는 Todo데이터는 stale상태로 변경할 필요 x
  const { data: todo } = useTodoDataById(id, "LIST");
  if (!todo) throw new Error("Todo Data Undefined");

  const { content, isDone } = todo;

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
