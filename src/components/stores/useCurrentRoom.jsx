import { create } from "zustand";

export const useCurrentRoom = create((set) => ({
  currentRoom: null,
  setCurrentRoom: (value) => set({ currentRoom: value }),
}));
