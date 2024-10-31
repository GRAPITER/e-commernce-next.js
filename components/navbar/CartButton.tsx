import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { Button } from "../ui/button";
import { fetchCartItems } from "@/utils/actions";

export default async function CartButton() {
  const cart = await fetchCartItems();
  const numItemsCenter = cart;
  return (
    <Button
      asChild
      variant={"outline"}
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link href={"/cart"}>
        <LuShoppingCart />
        <span className="text-white bg-primary h-6 w-6 flex justify-center items-center rounded-full text-xs absolute bottom-6 left-6">
          {numItemsCenter}
        </span>
      </Link>
    </Button>
  );
}
