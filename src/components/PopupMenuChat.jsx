import { Menu } from "@headlessui/react";

export default function PopupMenuChat({ messageItem }) {
  return (
    <Menu>
      <div className="relative">
        <Menu.Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-[#724ff9]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Menu.Button>

        <Menu.Items className="absolute right-0 top-0 z-10 flex min-w-[12rem] flex-col gap-1 divide-y-2 rounded-lg bg-slate-100 p-1 shadow-lg">
          <Menu.Item className="rounded-lg px-5 py-3 transition duration-100 hover:bg-[#724ff9] hover:text-white">
            {({ active }) => <button className={`${active && "bg-[#724ff9] text-white"}`}>Edit</button>}
          </Menu.Item>

          <Menu.Item className="rounded-lg px-5 py-3 transition duration-100 hover:bg-[#724ff9] hover:text-white">
            {({ active }) => <button className={`${active && "bg-[#724ff9] text-white"}`}>Copy</button>}
          </Menu.Item>

          <Menu.Item className="rounded-lg px-5 py-3 transition duration-100 hover:bg-red-500 hover:text-white">
            {({ active }) => <button className={`${active && "bg-[#724ff9] text-white"}`}>Delete</button>}
          </Menu.Item>
        </Menu.Items>
      </div>
    </Menu>
  );
}
