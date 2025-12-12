"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className=" p-12 flex flex-col  items-center text-center">
        <h1 className="text-4xl font-extrabold mb-2">ShinoMart</h1>
        <p className="mb-6">Find your products all in one place</p>
        <Button
          onClick={() => router.push("/products")}
          className="cursor-pointer"
        >
          View Products
        </Button>
      </div>
    </div>
  );
}
