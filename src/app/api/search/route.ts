// File: src/app/api/search/route.ts
import { NextResponse } from "next/server";
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
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const allProducts = await loadCSV();

  const matches = allProducts
    .filter((p) =>
      q.length === 0 ? true : p.product_name?.toLowerCase().includes(q)
    )
    .slice(0, 5)
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

  return NextResponse.json({ results: matches });
}
