import { useTodoDataById } from "@/hooks/queries/use-todo-by-id";
import { useParams } from "react-router";

export default function TodoDetailPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, error } = useTodoDataById(String(id));

  if (isLoading) return <div>로딩중입니다...</div>;
  if (error) return <div>오류가 발생했습니다.</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return <div>{data.content}</div>; // 이제 안전
}
