import { describe, expect, it } from "vitest";
import { products, valueBundles } from "@/lib/site";

describe("Product Catalog & Unique Assets Integrity", () => {
  it("contains an expanded catalog of agricultural products and bundles", () => {
    expect(products.length).toBeGreaterThanOrEqual(13);
    expect(valueBundles.length).toBeGreaterThanOrEqual(3);
  });

  it("ensures NEVER is 1 image used twice across products and value bundles", () => {
    const allImages = [
      ...products.map((p) => ({ title: p.name, image: p.image })),
      ...valueBundles.map((b) => ({ title: b.name, image: b.image })),
    ];

    const imageMap = new Map<string, string[]>();
    for (const item of allImages) {
      const existing = imageMap.get(item.image) || [];
      existing.push(item.title);
      imageMap.set(item.image, existing);
    }

    const duplicates: Array<{ image: string; items: string[] }> = [];
    imageMap.forEach((items, img) => {
      if (items.length > 1) {
        duplicates.push({ image: img, items });
      }
    });

    expect(duplicates).toEqual([]);
    expect(new Set(allImages.map((i) => i.image)).size).toBe(allImages.length);
  });

  it("verifies all products have valid pricing and units", () => {
    for (const p of products) {
      expect(p.name).toBeTruthy();
      expect(p.unit).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.approxFarmPrice).toMatch(/^₦/);
      expect(p.approxMarketPrice).toMatch(/^₦/);
    }
  });
});
