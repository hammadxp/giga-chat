import { create } from "zustand";
import { db } from "../../utils/firebase-config";
import { collection } from "firebase/firestore";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const useStore = create((set) => ({
  cookies: cookies,

  currentUser: null,
  setCurrentUser: (value) => set({ currentUser: value }),

  isSignedIn: cookies.get("auth-token"),
  setIsSignedIn: (value) => set({ isSignedIn: value }),

  rooms: [],
  setRooms: (value) => set({ rooms: value }),

  currentRoom: null,
  setCurrentRoom: (value) => set({ currentRoom: value }),

  roomsRef: collection(db, "rooms"),
  usersRef: collection(db, "users"),
  messagesRef: collection(db, "messages"),

  // incrementCount: () => set((state) => ({ count: state.count + 1 })),
}));
