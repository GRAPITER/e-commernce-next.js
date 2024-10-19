"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";

import Buttons from "./Buttons";
import { updateImageAction } from "@/utils/actions";

function ImageInputContainer({
  image,
  name,
  children,
}: {
  image: string;
  name: string;
  children: React.ReactNode;
}) {
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  return (
    <div className="mb-8">
      <Image
        src={image}
        width={200}
        height={200}
        className="rounded-md object-cover mb-4 w-[200px] h-[200px]"
        alt={name}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        Update image
      </Button>
      {isUpdateFormVisible && (
        <div className="max-w-md mt-4">
          <FormContainer action={updateImageAction}>
            {children}
            <ImageInput />
            <Buttons size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  );
}
export default ImageInputContainer;
