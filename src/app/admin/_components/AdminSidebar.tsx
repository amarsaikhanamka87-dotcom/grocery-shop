import { SidebarBrand } from "./SidebarBrand";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarNav } from "./SidebarNav";

// Desktop sidebar: fixed on the left from lg up. Mobile uses MobileSidebar.
export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-white lg:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-line px-5">
        <SidebarBrand />
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
      <SidebarFooter />
    </aside>
  );
}
