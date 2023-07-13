import PopupMenuAccount from "./PopupMenuAccount";
import { useStore } from "./stores/useStore";

export default function NavBar() {
  const { currentRoom } = useStore();

  return (
    <div
      className={`col-span-2 flex items-center justify-between rounded-xl px-8 py-2 600px:rounded-none 600px:bg-[#f2efff] 600px:py-4 ${
        currentRoom ? "600px:hidden" : "600px:flex"
      }`}
    >
      <img src="/images/logo.svg" alt="Grogo logo" className="h-8" />
      <PopupMenuAccount />
    </div>
  );
}
