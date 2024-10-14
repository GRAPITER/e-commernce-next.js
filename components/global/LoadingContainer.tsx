import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "../ui/card";

export default function LoadingContainer() {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Skelton />
      <Skelton />
      <Skelton />
    </div>
  );
}

function Skelton() {
  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-48 w-full " />
          <Skeleton className="h-4 w-1/2 mt-4 " />
          <Skeleton className="h-4 w-1/4 mt-4" />
        </CardContent>
      </Card>
    </div>
  );
}
