"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function SignoutLink() {
  const { toast } = useToast();
  function handleToast() {
    toast({
      description: "logout successfully",
    });
  }
  return (
    <SignOutButton>
      <Link
        href={"/"}
        onClick={handleToast}
        className="w-full text-left px-2 py-1"
      >
        Log out
      </Link>
    </SignOutButton>
  );
}
