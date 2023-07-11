import { create } from "zustand";
import Cookies from "universal-cookie";

import { db } from "../../utils/firebase-config";
import { collection } from "firebase/firestore";

const cookies = new Cookies();

export const useStore = create(() => ({
  cookies: cookies,

  roomsRef: collection(db, "rooms"),
  usersRef: collection(db, "users"),
  messagesRef: collection(db, "messages"),
}));
