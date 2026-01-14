"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/themes";
import AuthStatus from "./AuthStatus";

const MobileSheet = ({ navItems }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        description=""
        side="right"
        className="bg-background  text-black dark:text-white font-extrabold"
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
              className="text-lg font-semibold text-accent-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-6 space-y-3 border-t pt-6">
            <AuthStatus />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
