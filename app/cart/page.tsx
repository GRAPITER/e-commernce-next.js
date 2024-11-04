import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";

import { createOrUpdateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = auth();
  if (!user.userId) redirect("/");

  const cart = await createOrUpdateCart(user.userId);

  if (cart.numItemsInCart === 0) return <SectionTitle text="cart is empty " />;

  return (
    <div>
      <SectionTitle text="Shooping cart" />
      <div className="grid gap-4 mt-8 lg:grid-cols-12">
        <div className="col-span-8">
          <CartItemsList cartItems={cart.cartItems} />
        </div>
        <div className="col-span-4">
          <CartTotals cart={cart} />
        </div>
      </div>
    </div>
  );
}
