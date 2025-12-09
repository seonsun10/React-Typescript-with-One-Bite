import { useCountStore } from "@/store/count";
import { Button } from "../ui/button";
import { useShallow } from "zustand/shallow";

export default function Controller() {
  const { increase, decrease } = useCountStore(
    useShallow((state) => ({
      increase: state.actions.increase,
      decrease: state.actions.decrease,
    })),
  );
  // const increase = useCountStore((s) => s.actions.increase);
  // const decrease = useCountStore((s) => s.actions.decrease);

  return (
    <>
      <div>
        <Button onClick={decrease}>-</Button>
        <Button onClick={increase}>+</Button>
      </div>
    </>
  );
}
