import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./MobileSidebar";

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur lg:px-8">
      <MobileSidebar />
      <span className="text-[15px] font-bold lg:hidden">Админ</span>
      <div className="ml-auto">
        <UserButton />
      </div>
    </header>
  );
}
