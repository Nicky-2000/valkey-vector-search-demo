// File: src/app/product/[id]/page.tsx

import { notFound } from "next/navigation";
import RecommendedProducts from "@/components/RecommendedProducts";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/product/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const { product, recommended } = await res.json();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.name}</h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}

      <p className="text-gray-700 mb-8">{product.llmBlurb}</p>

      <h2 className="text-xl font-semibold mb-4">Recommended Products</h2>
      <RecommendedProducts products={recommended} />
    </main>
  );
}
