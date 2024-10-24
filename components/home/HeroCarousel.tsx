import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import hero1 from "@/public/images/pexels-fotios-photos-27794677.jpg";
import hero2 from "@/public/images/pexels-heyho-6394533.jpg";
import hero3 from "@/public/images/pexels-s3t-koncepts-1636465088-28853337.jpg";
import hero4 from "@/public/images/pexels-sidde-62197501-9532342.jpg";

const imageArray = [hero1, hero2, hero3, hero4];

export default function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {imageArray.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-2">
                    <Image
                      src={image}
                      alt="hero"
                      className="w-full h-[24rem] rounded-md object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-5" />
        <CarouselNext className="absolute right-5" />
      </Carousel>
    </div>
  );
}
