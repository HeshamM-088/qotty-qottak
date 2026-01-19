"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, PawPrint, Heart, Users, LayoutDashboard } from "lucide-react";

const navItems = [
  { id: 0, href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { id: 1, href: "/admin/cats", label: "القطط", icon: PawPrint },
  { id: 2, href: "/admin", label: "طلبات التبني", icon: Heart },
  { id: 3, href: "/admin", label: "المستخدمون", icon: Users },
];

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-lg border"
      >
        <Menu />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-sidebar z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h1 className="font-bold">قطتي-قطتك</h1>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(({ id, href, label, icon: Icon }) => (
            <Link
              key={id}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;
