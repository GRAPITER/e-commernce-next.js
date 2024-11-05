"use client";

import Image from "next/image";
import Link from "next/link";
import FormContainer from "../form/FormContainer";
import { DeleteCartItem, editCartItem } from "@/utils/actions";
import Buttons from "../form/Buttons";
import { useState } from "react";

export function ColumnOne({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32 ">
      <Image
        src={image}
        alt={name}
        fill
        priority
        className="object-cover rounded-md w-full"
      />
    </div>
  );
}

export function ColumnTwo({
  name,
  company,
  productId,
}: {
  name: string;
  company: string;
  productId: string;
}) {
  return (
    <div className="sm:w-48">
      <Link href={`products/${productId}`}>
        <p className="font-bold text-lg capitalize">{name}</p>
        <p className="text-xs capitalize font-normal">{company}</p>
      </Link>
    </div>
  );
}

export function ColumnThird({ id, amount }: { id: string; amount: number }) {
  const [quantity, setQuantity] = useState(amount);
  const [isLoading, setIsLoading] = useState(false);
  async function handleAmountChange(value: number) {
    if (value < 1) return;
    try {
      setIsLoading(true);
      const result = await editCartItem({ amount: value, cartItemId: id });
      setQuantity(value);
      if (result instanceof Error) {
        throw result;
      }
    } catch (error) {
      console.error("failed to update cart", error);
      setQuantity(quantity);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col justify-between">
      <div className="flex mb-4 w-full justify-between items-center">
        <button
          className="h-5 w-5 p-0 rounded-full bg-primary flex justify-center items-center disabled:bg-blue-400"
          onClick={() => handleAmountChange(quantity + 1)}
          disabled={isLoading}
        >
          +
        </button>
        <p>{quantity}</p>
        <button
          className="h-5 w-5 rounded-full bg-primary flex justify-center items-center disabled:bg-blue-400"
          onClick={() => handleAmountChange(quantity - 1)}
          disabled={isLoading || quantity < 1}
        >
          -
        </button>
      </div>
      <FormContainer action={DeleteCartItem}>
        <input type="hidden" name="pId" value={id} />
        <Buttons size="sm" text="Remove" />
      </FormContainer>
    </div>
  );
}

export function ColumnFourth({ price }: { price: number }) {
  return (
    <div className="md:ml-auto">
      <p className="font-bold text-lg">${price}.00</p>
    </div>
  );
}
