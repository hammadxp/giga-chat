import PopupMenuAccount from "./PopupMenuAccount";

export default function NavBar() {
  return (
    <div className="col-span-2 flex items-center justify-between rounded-xl px-8 py-2">
      <img src="/images/logo.svg" alt="Grogo logo" className="h-8" />
      <PopupMenuAccount />
    </div>
  );
}
