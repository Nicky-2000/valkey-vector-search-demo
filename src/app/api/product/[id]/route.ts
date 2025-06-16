// File: src/app/api/product/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const DATA_PATH = path.join(process.cwd(), "src/data/flipkart_com-ecommerce_sample.csv");

async function loadCSV(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(DATA_PATH)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const allProducts = await loadCSV();

  const product = allProducts.find((p) => p.uniq_id === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const imageUrl = (() => {
    try {
      const parsed = JSON.parse(product.image);
      return Array.isArray(parsed) ? parsed[0] : undefined;
    } catch {
      return undefined;
    }
  })();

  const recommended = allProducts
    .filter((p) => p.uniq_id !== product.uniq_id)
    .slice(0, 3)
    .map((p) => ({
      id: p.uniq_id,
      name: p.product_name,
      shortDescription: p.description?.slice(0, 100) || "No description.",
      imageUrl: (() => {
        try {
          const parsed = JSON.parse(p.image);
          return Array.isArray(parsed) ? parsed[0] : undefined;
        } catch {
          return undefined;
        }
      })(),
    }));

  return NextResponse.json({
    product: {
      id: product.uniq_id,
      name: product.product_name,
      imageUrl,
      llmBlurb: product.description || "No description available.",
    },
    recommended,
  });

}
