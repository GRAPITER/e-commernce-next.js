import { FetchAllProducts } from "@/utils/actions";
import { Button } from "../ui/button";

import { IoIosList } from "react-icons/io";
import { BsGrid } from "react-icons/bs";

import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default async function ProductsContainer({
  layout,
  search,
}: {
  layout?: string;
  search?: string;
}) {
  const products = await FetchAllProducts(search);
  const searchTerm = search ? `&search=${search}` : "";
  return (
    <>
      {" "}
      <div className="flex justify-between items-center flex-wrap">
        <h2 className="font-medium text-lg">
          {`${products.length} ${products.length > 1 ? "products" : "product"}`}
        </h2>
        <div className="space-x-6 ">
          <Button
            asChild
            variant={`${layout === "list" ? "default" : "ghost"}`}
            size={"icon"}
            className="font-bold"
          >
            <Link href={`/products?layout=list${searchTerm}`}>
              <IoIosList />
            </Link>
          </Button>
          <Button
            asChild
            variant={`${layout === "grid" ? "default" : "ghost"}`}
            size={"icon"}
          >
            <Link href={`/products?layout=grid${searchTerm}`}>
              <BsGrid />
            </Link>
          </Button>
        </div>
      </div>
      <Separator className="mt-8" />
      <div>
        {products.length === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : (
          ""
        )}
        {layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}
