import { Skeleton } from "../ui/skeleton";

export default function LoadingRow({ row = 5 }: { row: number }) {
  return Array.from({ length: row }, (_, index) => {
    return (
      <div key={index} className="mb-4">
        <Skeleton className="w-full h-8 rounded-sm" />
      </div>
    );
  });
}
