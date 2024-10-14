import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
      <div className="">
        <h1 className="max-w-2xl tracking-tights  sm:text-6xl  text-4xl font-bold">
          We are changing the way people shop
        </h1>
        <p className="mt-8 text-xl text-muted-foreground max-w-xl leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque et
          voluptas saepe in quae voluptate, laborum maiores possimus illum
          reprehenderit aut delectus veniam cum perferendis unde sint doloremque
          non nam.
        </p>
        <Button size={"lg"} asChild className="capitalize mt-10">
          <Link href={"/products"}> our product</Link>
        </Button>
      </div>
      <HeroCarousel />
    </div>
  );
}
