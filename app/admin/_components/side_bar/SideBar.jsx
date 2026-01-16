import Link from "next/link";
import { PawPrint, Heart, Users, LayoutDashboard } from "lucide-react";

const navItems = [
  { id: 0, href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { id: 1, href: "/admin/cats", label: "القطط", icon: PawPrint },
  { id: 2, href: "/admin", label: "طلبات التبني", icon: Heart },
  { id: 3, href: "/admin", label: "المستخدمون", icon: Users },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-l border-sidebar-border hidden md:flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">
              قطتي-قطتك
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Qotty Qottak</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ id, href, label, icon: Icon }) => (
          <Link
            key={id}
            href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
          >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/20 rounded-lg p-4 text-center">
          <p className="text-xs text-sidebar-foreground/60">
            لوحة التحكم الرئيسية
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
