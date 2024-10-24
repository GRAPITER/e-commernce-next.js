"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import FormContainer from "../form/FormContainer";

import TextAreaInput from "../form/TextAreaInput";
import Buttons from "../form/Buttons";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "./RatingInput";
import { useUser } from "@clerk/nextjs";

export default function SubmitReview({ productId }: { productId: string }) {
  const { user } = useUser();
  const [reviewToggle, setReviewToggle] = useState(false);

  return (
    <div>
      <Button
        size={"lg"}
        variant={"outline"}
        className="my-6"
        onClick={() => setReviewToggle((toogle) => !toogle)}
      >
        Leave Review
      </Button>
      {reviewToggle && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />
            <input
              type="hidden"
              name="authorImageUrl"
              value={user?.imageUrl || ""}
            />

            <RatingInput label="rating" name="rating" />
            <div className="mt-6">
              <TextAreaInput
                name="comment"
                label="FeedBack"
                defaultValue="outstanding product....."
              />
            </div>
            <Buttons classname="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}
