import { Product } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <div>
      {products.map((product) => {
        const { image, price, name, company } = product;
        return (
          <div key={product.id} className="overflow-hidden">
            <Link href={`products/${product.id}`}>
              <Card className="p-8 mt-12 hover:shadow-xl duration-500">
                <CardContent className="grid justify-center  md:grid-cols-3 p-0 space-y-8 md:space-y-0  space-x-3">
                  <div className="relative h-56 md:w-56 w-64  ">
                    <Image
                      src={image}
                      alt="image"
                      fill
                      className="object-cover rounded-lg hover:shadow-lg duration-500 w-full"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold capitalize">{name}</h1>
                    <p className="text-muted-foreground">{company}</p>
                  </div>
                  <div className=" flex flex-col justify-between md:items-end ">
                    <h1 className=" text-muted-foreground font-medium">
                      ${price}.00
                    </h1>
                    <FavoriteToggleButton productId={product.id} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
