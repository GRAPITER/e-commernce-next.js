import { Cart } from "@prisma/client";
import { Card, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import FormContainer from "../form/FormContainer";
import { CreateOrderAction } from "@/utils/actions";
import Buttons from "../form/Buttons";

export default function CartTotals({ cart }: { cart: Cart }) {
  return (
    <div>
      <Card className="p-8">
        <CardRow label={"subTotal"} amount={cart.cartTotal} />
        <CardRow label={"shipping"} amount={cart.shipping} />
        <CardRow label={"tax"} amount={cart.tax} />
        <CardTitle className="mt-8">
          <CardRow label="Order total" amount={cart.orderTotal} last={true} />
        </CardTitle>
      </Card>
      <FormContainer action={CreateOrderAction}>
        <Buttons classname="mt-8 w-full" text="place order" />
      </FormContainer>
    </div>
  );
}

function CardRow({
  label,
  amount,
  last,
}: {
  label: string;
  amount: number;
  last?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-sm capitalize">
        <span>{label}</span>
        <span>${amount}</span>
      </p>
      {last ? null : <Separator className="my-2" />}
    </>
  );
}
