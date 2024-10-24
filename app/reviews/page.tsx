import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "@/components/reviews/ReviewCard";

import { DeleteUserReview, fetchUserReview } from "@/utils/actions";

export default async function page() {
  const reviews = await fetchUserReview();

  if (reviews.length === 0) {
    return <SectionTitle text="there is no reviews" />;
  }
  return (
    <section>
      <SectionTitle text="Your reviews" />

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating, id } = review;
          const { image, name } = review.product;
          const reviewInfo = {
            comment,
            rating,
            image,
            name,
          };

          return (
            <ReviewCard reviewInfo={reviewInfo} key={id}>
              <DeleteReview reviewId={id} />
            </ReviewCard>
          );
        })}
      </div>
    </section>
  );
}

async function DeleteReview({ reviewId }: { reviewId: string }) {
  return (
    <FormContainer action={DeleteUserReview}>
      <input type="hidden" name="rId" value={reviewId} />
      <IconButton actionType="delete" />
    </FormContainer>
  );
}
