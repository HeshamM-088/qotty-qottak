import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import AuthStatus from "./AuthStatus";
import MobileSheet from "./MobileView";

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
            <svg
              width="60"
              height="60"
              viewBox="0 0 260 260"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="130"
                cy="160"
                r="45"
                className="fill-accent-foreground"
              />
              <circle
                cx="85"
                cy="105"
                r="18"
                className="fill-accent-foreground"
              />
              <circle
                cx="120"
                cy="85"
                r="18"
                className="fill-accent-foreground"
              />
              <circle
                cx="155"
                cy="85"
                r="18"
                className="fill-accent-foreground"
              />
              <circle
                cx="190"
                cy="105"
                r="18"
                className="fill-accent-foreground"
              />

              <circle cx="130" cy="160" r="20" fill="#fff" />
              <polygon points="115,150 122,135 130,150" fill="#fff" />
              <polygon points="130,150 138,135 145,150" fill="#fff" />
            </svg>
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
