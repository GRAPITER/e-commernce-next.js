import ProductsContainer from "@/components/products/ProductsContainer";

export default function page({
  searchParams,
}: {
  searchParams: {
    layout?: string;
    search?: string;
  };
}) {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";

  return (
    <div className="mt-12">
      <ProductsContainer layout={layout} search={search} />
    </div>
  );
}
