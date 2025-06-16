// File: src/components/ProductCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-cover rounded-t-md"
        />
      )}
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.shortDescription}</p>
      </CardContent>
    </Card>
  );
}
