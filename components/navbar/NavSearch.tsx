"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

export default function NavSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search")?.toString());

  function handleSubmit(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`/products?${params.toString()}`);
  }

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <Input
      type="search"
      placeholder="Search..."
      className="dark:bg-muted max-w-xs"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSubmit(e.target.value);
      }}
    ></Input>
  );
}
