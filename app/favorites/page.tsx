import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchFavoriteproduct } from "@/utils/actions";

export default async function page() {
  const products = await fetchFavoriteproduct();

  return (
    <div>
      <SectionTitle text="Favorites" />

      <ProductsGrid products={products.map((product) => product.product)} />
    </div>
  );
}
