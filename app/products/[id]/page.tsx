import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import ProductReview from "@/components/reviews/ProductReview";
import SubmitReview from "@/components/reviews/SubmitReview";
import AddToChart from "@/components/single-product/AddToChart";
import BreadCramp from "@/components/single-product/BreadCramp";
import Rating from "@/components/single-product/Rating";
import { FetchSingleProduct } from "@/utils/actions";
import Image from "next/image";

export default async function page({ params }: { params: { id: string } }) {
  const product = await FetchSingleProduct(params.id);
  const { name, price, image, description, company } = product;
  return (
    <section>
      <BreadCramp name={product.name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-96 lg:h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <FavoriteToggleButton productId={params.id} />
          </div>
          <Rating productId={params.id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            ${price}.00
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToChart productId={params.id} />
        </div>
      </div>
      <div>
        <ProductReview productId={params.id} />
        <SubmitReview productId={params.id} />
      </div>
    </section>
  );
}
