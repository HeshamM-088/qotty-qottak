import Link from "next/link";
import { PawPrint, Heart, Users, LayoutDashboard } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/dashboard/cats", label: "القطط", icon: PawPrint },
  { href: "/dashboard/adoption-requests", label: "طلبات التبني", icon: Heart },
  { href: "/dashboard/users", label: "المستخدمون", icon: Users },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-l border-sidebar-border hidden md:flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">
              قطتي قطاك
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Qotty Qottak</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
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
