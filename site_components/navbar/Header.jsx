import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import AuthStatus from "./AuthStatus";
import MobileSheet from "./MobileView";
import { PawPrint } from "lucide-react";

const Header = () => {
  const navItems = [
    { label: "الرئيسية", href: "/" },
    { label: "تبنى قطة", href: "/cats" },
    { label: "عن المنصة", href: "/about" },
    { label: "دليل التبني", href: "/guide" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className=" flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          {/* site icon */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-sidebar-foreground">
                  قطتي-قطتك
                </h1>
                <p className="text-xs text-sidebar-foreground/60">
                  Qotty Qottak
                </p>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          <div className="hidden md:flex">
            <AuthStatus />
          </div>

          {/* mobile view */}
          <MobileSheet navItems={navItems} />
        </div>
      </div>
    </header>
  );
};

export default Header;
