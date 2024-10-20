import { auth } from "@clerk/nextjs/server";
import FavoriteToggleForm from "./FavoriteToggleForm";
import { FavoriteSignInButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";

export default async function FavoriteToggleButton({
  productId,
}: {
  productId: string;
}) {
  const user = auth();
  if (!user.userId) return <FavoriteSignInButton />;

  const favoriteId = await fetchFavoriteId({ productId });

  return <FavoriteToggleForm productId={productId} favoriteId={favoriteId} />;
}
