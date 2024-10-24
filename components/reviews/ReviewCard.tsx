import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import React from "react";
import Message from "./Message";
import RatingReview from "./Rating";

export default function ReviewCard({
  children,
  reviewInfo,
}: {
  reviewInfo: { name: string; image: string; rating: number; comment: string };
  children?: React.ReactNode;
}) {
  return (
    <Card className="relative mt-10">
      <CardHeader>
        <div className="flex space-x-1 gap-3 items-center">
          <Image
            src={reviewInfo.image}
            alt={reviewInfo.name}
            height={48}
            width={48}
            className="object-cover rounded-full h-12 w-12"
          />

          <div className="ml-4">
            <h3 className="text-sm font-bold capitalize mb-1">
              {reviewInfo.name}
            </h3>
            <RatingReview rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          <Message message={reviewInfo.comment} />
        </p>
      </CardContent>
      <div className="absolute top-2 right-2">{children}</div>
    </Card>
  );
}
