import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";

export default function Review({ rating }: { rating: number }) {
  const ratings = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1 <= rating;
    return value;
  });
  return (
    <div className="flex items-center gap-x-0 ">
      {ratings.map((filled) => {
        const className = `w-5 h-5 ${
          filled ? "text-primary" : "text-gray-400"
        }`;
        return filled ? (
          <IoMdStar className={className} />
        ) : (
          <IoMdStarOutline className={className} />
        );
      })}
    </div>
  );
}
