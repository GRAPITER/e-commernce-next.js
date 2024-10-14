import { Product } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import FavoriteToggleButton from "./FavoriteToggleButton";

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => {
        const { name, image, price } = product;
        const productId = product.id;

        return (
          <div key={productId} className="relative ">
            <Link href={`/products/${productId}`}>
              <Card className=" hover:shadow-xl  duration-500">
                <CardContent>
                  <div className="relative h-64 md:h-52 mt-5 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt="product image"
                      fill
                      priority
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover w-full rounded hover:scale-110 duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="capitalize text-lg">{name}</h2>
                    <p className="capitalize pt-4 text-muted-foreground">
                      {price + "$"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-8">
              <FavoriteToggleButton productId={productId} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
