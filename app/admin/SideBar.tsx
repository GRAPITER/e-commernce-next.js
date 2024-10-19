"use client";
import { Button } from "@/components/ui/button";
import { AdminLink } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();
  return (
    <aside>
      {AdminLink.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Button
            key={link.href}
            asChild
            variant={isActive ? "default" : "ghost"}
            className="w-full font-normal capitalize mb-2 justify-start"
          >
            <Link href={link.href}>{link.name}</Link>
          </Button>
        );
      })}
    </aside>
  );
}
