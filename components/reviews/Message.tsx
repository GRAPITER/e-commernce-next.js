"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function Message({ message }: { message: string }) {
  const [isExpanded, setIsExpended] = useState(false);

  const isLong = message.length > 130;
  const condition =
    isLong && isExpanded ? message : `${message.slice(0, 130)}...`;

  return (
    <div>
      {condition}
      {isLong && (
        <Button
          variant={"link"}
          onClick={() => setIsExpended((toogle) => !toogle)}
          className="p-0 text-muted-foreground"
        >
          {isExpanded ? "Show Less..." : "Show More..."}
        </Button>
      )}
    </div>
  );
}
