/**
 * 전역상태 보관
 */

import { create } from "zustand";
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCountStore = create(
  devtools(
    // 로컬 스토리지에 저장할 수 있음
    persist(
      subscribeWithSelector(
        immer(
          combine({ count: 0 }, (set, get) => ({
            actions: {
              increase: () => {
                set((state) => {
                  state.count++;
                });
              },
              decrease: () => {
                set((state) => {
                  state.count--;
                });
              },
            },
          })),
        ),
      ),
      {
        name: "countStore",
        partialize: (store) => ({
          // count만 저장
          count: store.count,
        }),
        // 로컬 스토리지 -> 세션 스토리지에 저장으로 변경
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    {
      name: "countStore",
    },
  ),
);

useCountStore.subscribe(
  (store) => store.count,

  // count가 업데이트 될 때마다 실행됨
  (count, prevCount) => {
    const store = useCountStore.getState();
  },
);

export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useIncrease = () => {
  const increase = useCountStore((store) => store.actions.increase);
  return increase;
};

export const useDecrease = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};
