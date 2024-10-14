import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Links } from "@/utils/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { LuAlignLeft } from "react-icons/lu";
import UserIcon from "./UserIcon";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import SignoutLink from "./SignoutLink";

export default function LinkDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="h-6 w-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem className="hover:bg-muted hover:rounded-md px-2 py-1 hover:outline-none w-full">
            <SignInButton mode="modal">
              <button className="w-full text-left px-2 py-1">Sign in</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:bg-muted hover:rounded-md px-2 py-1 hover:outline-none w-full">
            <SignUpButton mode="modal">
              <button className="w-full text-left px-2 py-1">sign up</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {Links.map((link) => {
            return (
              <DropdownMenuItem
                key={link.href}
                className="hover:bg-muted hover:rounded-md px-2 py-1 hover:outline-none w-full"
              >
                <Link href={link.href} className="w-full  capitalize ">
                  {link.name}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <SignoutLink />
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
