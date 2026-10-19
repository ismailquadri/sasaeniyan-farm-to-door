import { describe, expect, it } from "vitest";
import { getProductRecommendations, buildWhatsAppOrderMessage } from "@/lib/ai-recommender";
import { products } from "@/lib/site";

describe("AI Recommender", () => {
  it("throws when query is empty", async () => {
    await expect(getProductRecommendations("   ")).rejects.toThrow(
      "Please enter what you are looking to cook or grow.",
    );
  });

  it("recommends fresh produce and poultry for stew/rice requests", async () => {
    const result = await getProductRecommendations("I'm cooking Nigerian tomato stew and rice for a party");
    expect(result.category).toBe("meal");
    expect(result.recommended.length).toBeGreaterThan(0);
    const names = result.recommended.map((r) => r.product.name);
    expect(names).toContain("Fresh Vegetable Basket");
  });

  it("recommends organic manure for farm soil requests", async () => {
    const result = await getProductRecommendations("Need organic manure and compost to restore soil for maize");
    expect(result.category).toBe("farm");
    expect(result.recommended.length).toBeGreaterThan(0);
    const names = result.recommended.map((r) => r.product.name);
    const hasManure = names.some((n) => n.includes("Manure") || n.includes("Compost"));
    expect(hasManure).toBe(true);
  });

  it("builds a pre-filled WhatsApp link with the recommended products", () => {
    const mockRecs = [
      { product: products[0]!, reason: "Soil enrichment" },
      { product: products[2]!, reason: "Fresh cooking ingredients" },
    ];
    const link = buildWhatsAppOrderMessage("Vegetable garden setup", mockRecs);
    expect(link).toContain("https://wa.me/2347061241898?text=");
    expect(decodeURIComponent(link)).toContain("Vegetable garden setup");
    expect(decodeURIComponent(link)).toContain(products[0]!.name);
    expect(decodeURIComponent(link)).toContain(products[2]!.name);
  });
});
