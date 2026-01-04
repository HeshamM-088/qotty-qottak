import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, PlusCircle, Menu, LogIn, UserPlus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const navItems = [
    { label: "الرئيسية", href: "/" },
    { label: "تبنى قطة", href: "/cats" },
    { label: "عن المنصة", href: "/about" },
    { label: "دليل التبني", href: "/guide" },
  ];

  const isAuthenticated = false;

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

          {isAuthenticated ? (
            <>
              <Link href="/favorites">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              <Link href="/add-cat" className="hidden sm:block">
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  أضف قطة
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button
                  variant="outline"
                  className="gap-2 cursor-pointer dark:bg-accent-foreground font-semibold hover:text-black"
                >
                  <LogIn className="h-4 w-4" />
                  دخول
                </Button>
              </Link>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              description=""
              side="right"
              className="bg-blue-200 text-white"
            >
              <DialogTitle>
                <VisuallyHidden>قائمة الموقع</VisuallyHidden>
              </DialogTitle>

              <DialogDescription>
                <VisuallyHidden>
                  يحتوي هذا اللوح على روابط التنقل وخيارات الحساب للمستخدم
                </VisuallyHidden>
              </DialogDescription>

              <nav className="flex flex-col gap-4 mt-8 ">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-semibold text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-6 space-y-3 border-t pt-6">
                  {isAuthenticated ? (
                    <>
                      <Link href="/favorites">
                        <Button variant="outline" className="w-full gap-2">
                          <Heart className="h-4 w-4" />
                          قطتي المفضلة
                        </Button>
                      </Link>
                      <Link href="/add-cat">
                        <Button className="w-full gap-2">
                          <PlusCircle className="h-4 w-4" />
                          أضف قطة
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button
                          variant="secondary"
                          className="w-full bg-blue-800 gap-2"
                        >
                          <LogIn className="h-4 w-4" />
                          تسجيل الدخول
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
