"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FaHeart, FaRegEdit, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import { SignInButton } from "@clerk/nextjs";

type ButtonType = {
  classname?: string;
  text?: string;
  size?: "default" | "sm" | "lg";
};

export default function Buttons({
  size = "lg",
  text = "submit",
  classname = "",
}: ButtonType) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size={size}
      disabled={pending}
      className={cn("capitalize", classname)}
    >
      {pending ? (
        <>
          {" "}
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> pleaseWait...{" "}
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type iconButton = "edit" | "delete";

export function IconButton({ actionType }: { actionType: iconButton }) {
  const { pending } = useFormStatus();
  function renderIcon() {
    switch (actionType) {
      case "edit":
        return <FaRegEdit />;

      case "delete":
        return <FaRegTrashAlt />;
    }
  }

  return (
    <Button
      type="submit"
      size={"icon"}
      variant={"ghost"}
      className="p-2 cursor-pointer"
    >
      {pending ? <ReloadIcon className="animate-spin" /> : renderIcon()}
    </Button>
  );
}

export function FavoriteSignInButton() {
  return (
    <SignInButton mode="modal">
      <Button
        asChild
        size={"icon"}
        variant={"outline"}
        className="p-2 cursor-pointer"
      >
        <FaHeart />
      </Button>
    </SignInButton>
  );
}

export function FavoriteButton({ favoriteId }: { favoriteId: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button className="p-2" size={"icon"} variant={"outline"}>
      {pending ? (
        <ReloadIcon className="animate-spin" />
      ) : favoriteId ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
}

export function CartSignInButton() {
  return (
    <SignInButton mode="modal">
      <Button size={"lg"} className="mt-8 capitalize">
        {" "}
        sign In
      </Button>
    </SignInButton>
  );
}
