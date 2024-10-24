import { fetchRatingAverage } from "@/utils/actions";
import { FaStar } from "react-icons/fa";

export default async function Rating({ productId }: { productId: string }) {
  const result = await fetchRatingAverage(productId);

  const ActualValue = `(${result[0]?._count.rating ?? 0}) reviews`;
  return (
    <div className="flex items-center gap-2 mt-3">
      <FaStar />
      <p>{result[0]?._avg.rating?.toFixed(1) ?? 0}</p>
      {ActualValue}
    </div>
  );
}
