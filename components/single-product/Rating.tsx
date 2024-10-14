import { FaStar } from "react-icons/fa";

export default function Rating({ productId }: { productId: string }) {
  //temporary valuer
  const rating = 4.2;
  const count = 25;
  const ActualValue = `(${count}) reviews`;
  return (
    <div className="flex items-center gap-2 mt-3">
      <FaStar />
      <p>{rating}</p>
      {ActualValue}
    </div>
  );
}
