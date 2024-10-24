import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <ReviewCardLoading />
      <ReviewCardLoading />
      <ReviewCardLoading />
      <ReviewCardLoading />
    </div>
  );
}

function ReviewCardLoading() {
  return (
    <Card className="relative mt-10">
      <CardHeader>
        <div className="flex space-x-1 gap-3 items-center">
          <div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>

          <div className="ml-4">
            <div>
              <Skeleton className="h-3 w-28 " />
            </div>
            <div className="mt-3">
              <Skeleton className="h-3 w-28 " />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          {" "}
          <Skeleton className="h-3 w-full " />
        </div>
        <div className="my-5">
          {" "}
          <Skeleton className="h-3 w-full" />
        </div>
        <div>
          {" "}
          <Skeleton className="h-3 w-full " />
        </div>
      </CardContent>
    </Card>
  );
}
