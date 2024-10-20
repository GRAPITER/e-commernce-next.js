"use client";
import { usePathname } from "next/navigation";
import { FavoriteButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { buttonFavoriteToogle } from "@/utils/actions";

export default function FavoriteToggleForm({
  productId,
  favoriteId,
}: {
  productId: string;
  favoriteId: string | null;
}) {
  const pathName = usePathname();
  return (
    <FormContainer action={buttonFavoriteToogle}>
      <input type="hidden" name="pId" value={productId} />
      <input type="hidden" name="fId" value={favoriteId || ""} />
      <input type="hidden" name="pName" value={pathName} />
      <FavoriteButton favoriteId={favoriteId ? true : false} />
    </FormContainer>
  );
}
