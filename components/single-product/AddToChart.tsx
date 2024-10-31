"use client";

import Buttons, { CartSignInButton } from "../form/Buttons";
import { useAuth } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import FormContainer from "../form/FormContainer";
import { addToCartActions } from "@/utils/actions";

export default function AddToChart({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1);

  const user = useAuth();
  if (!user.userId) {
    return <CartSignInButton />;
  }

  return (
    <>
      <h4 className="mb-2 capitalize">amount : </h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={amount}></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 10 }, (_, i) => {
            const SelectValue = (i + 1).toString();
            return (
              <SelectItem value={SelectValue} key={i}>
                {SelectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <FormContainer action={addToCartActions}>
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="pId" value={productId} />
        <Buttons text="add to cart" classname="mt-4" />
      </FormContainer>
    </>
  );
}
