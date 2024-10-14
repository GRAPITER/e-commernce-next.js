import { FetchFeaturedProducts } from "@/utils/actions";
import SectionTitle from "../global/SectionTitle";
import { Separator } from "../ui/separator";
import ProductsGrid from "@/components/products/ProductsGrid";
import EmptyList from "../global/EmptyList";

export default async function FeaturedProducts() {
  const products = await FetchFeaturedProducts();
  if (products.length === 0) {
    return <EmptyList />;
  }
  return (
    <div className="pt-24">
      <SectionTitle text="Featured products" />
      <Separator />
      <ProductsGrid products={products} />
    </div>
  );
}
