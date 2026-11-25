import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./MobileSidebar";

export function AdminTopbar() {
  return (
    // Solid white, no backdrop-blur: a blur makes the header the containing block for the phone
    // menu's `fixed inset-0` drawer, which then got squeezed into the 64px header.
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white px-4 lg:px-8">
      <MobileSidebar />
      <span className="text-[15px] font-bold lg:hidden">Админ</span>
      <div className="ml-auto">
        <UserButton />
      </div>
    </header>
  );
}
