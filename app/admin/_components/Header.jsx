"use client";

import { useState } from "react";
import { Bell, LogOut, User, Menu } from "lucide-react";
import { ThemeToggle } from "@/site_components/ThemeToggle";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 hover:bg-muted rounded-lg">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-foreground hidden md:block">
          إدارة النظام
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        <ThemeToggle />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold">
              أ
            </div>
            <span className="hidden sm:inline text-sm font-medium text-foreground">
              المسؤول
            </span>
          </button>

          {showProfile && (
            <div className="absolute left-0 mt-2 w-48 bg-card rounded-lg border border-border shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
              <div className="p-4 border-b border-border">
                <p className="font-semibold text-foreground">المسؤول الرئيسي</p>
                <p className="text-xs text-muted-foreground">
                  heshamkhalil1988@gmail.com
                </p>
              </div>
              <button className="w-full px-4 py-2 flex items-center gap-2 hover:bg-muted transition-colors text-right">
                <User className="w-4 h-4" />
                <span className="text-sm">الملف الشخصي</span>
              </button>
              <button className="w-full px-4 py-2 flex items-center gap-2 hover:bg-destructive/10 text-destructive transition-colors text-right border-t border-border">
                <LogOut className="w-4 h-4" />
                <span className="text-sm">تسجيل خروج</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
