import { Menu } from "@headlessui/react";
import { useStore } from "./stores/useStore";
import useAuth from "./hooks/useAuth";

export default function PopupMenuAccount() {
  const { currentUser } = useStore();
  const { signOutUser } = useAuth();

  return (
    <Menu>
      <div className="relative">
        <Menu.Button className="flex items-center gap-4 text-gray-900">
          <p>{currentUser?.displayName}</p>
          <img src={currentUser?.photoURL} alt="Account photo" className="h-10 w-10 rounded-full" />
        </Menu.Button>

        <Menu.Items className="absolute right-0 top-12 z-10 flex min-w-[12rem] flex-col gap-1 divide-y-2 rounded-lg bg-slate-100 p-1 shadow-lg">
          <Menu.Item className="rounded-lg px-5 py-3 transition duration-100 hover:bg-[#724ff9] hover:text-white">
            {({ active }) => <button className={`${active && "bg-[#724ff9] text-white"}`}>Account settings</button>}
          </Menu.Item>

          <Menu.Item onClick={() => signOutUser()} className="rounded-lg px-5 py-3 transition duration-100 hover:bg-red-500 hover:text-white">
            {({ active }) => <button className={`${active && "bg-[#724ff9] text-white"}`}>Sign out</button>}
          </Menu.Item>
        </Menu.Items>
      </div>
    </Menu>
  );
}
