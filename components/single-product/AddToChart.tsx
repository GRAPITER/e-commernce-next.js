import { Button } from "../ui/button";

export default function AddToChart({ productId }: { productId: string }) {
  return (
    <Button variant="default" size="lg" className="mt-3">
      Add To Cart
    </Button>
  );
}
