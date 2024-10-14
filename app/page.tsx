import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Hero />

      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
