import { Card } from "../ui/card";
import { ColumnFourth, ColumnOne, ColumnThird, ColumnTwo } from "./CartColums";

type CartItem = {
  id: string;
  productId: string;
  cartId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
};

type Product = {
  id: string;
  name: string;
  company: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
};

export default function CartItemsList({
  cartItems,
}: {
  cartItems: CartItem[];
}) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { amount, id, productId } = cartItem;
        const { image, name, company, price } = cartItem.product;

        return (
          <Card
            key={id}
            className="flex flex-col md:flex-row  p-6 mb-8 gap-x-4 gap-y-4 flex-wrap"
          >
            <ColumnOne image={image} name={name} />
            <ColumnTwo company={company} name={name} productId={productId} />

            <ColumnThird id={id} amount={amount} />
            <ColumnFourth price={price} />
          </Card>
        );
      })}
    </div>
  );
}
