import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Links } from "@/utils/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { LuAlignLeft } from "react-icons/lu";

export default function LinkDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        {Links.map((link) => {
          return (
            <DropdownMenuItem
              key={link.href}
              className="hover:bg-muted hover:rounded-md py-1 hover:outline-none w-full"
            >
              <Link href={link.href} className="w-full  capitalize ">
                {link.name}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
