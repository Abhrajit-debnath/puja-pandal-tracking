import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UsersStore {
  usersCount: number;
  setUsersCount: (count: number) => void;
}

export const useUsersStore = create<UsersStore>()(
  persist(
    (set) => ({
      usersCount: 0,
      setUsersCount: (count: number) => set({ usersCount: count }),
    }),
    {
      name: "users-storage",
    }
  )
);
