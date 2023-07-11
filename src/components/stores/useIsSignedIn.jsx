import { create } from "zustand";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const useIsSignedIn = create((set) => ({
  isSignedIn: cookies.get("auth-token"),
  setIsSignedIn: (value) => set({ isSignedIn: value }),
  // incrementCount: () => set((state) => ({ count: state.count + 1 })),
}));
