import { fetchProductReview } from "@/utils/actions";

import ReviewCard from "./ReviewCard";

import SectionTitle from "../global/SectionTitle";

export default async function ProductReview({
  productId,
}: {
  productId: string;
}) {
  const reviews = await fetchProductReview(productId);

  return (
    <div className="mt-16">
      <SectionTitle text="Product Review" />
      <div className="grid md:grid-cols-2 gap-4">
        {reviews.map((review) => {
          const { authorImageUrl, rating, authorName, comment, id } = review;
          const reviewInfo = {
            image: authorImageUrl,
            rating,
            name: authorName,
            comment,
          };

          return <ReviewCard key={id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
}
