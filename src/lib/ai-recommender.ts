import { products, type Product } from "./site";
import { buildWhatsAppLink, draftAiRecommendationMessage } from "./whatsapp";

export type RecommendationResult = {
  query: string;
  category: "meal" | "farm" | "general";
  headline: string;
  advice: string;
  tip?: string;
  recommended: Array<{
    product: Product;
    reason: string;
  }>;
  source: "ai-gateway" | "fallback-engine";
};

const SYSTEM_PROMPT = `You are the expert Agricultural & Culinary AI Assistant for Sàsàèníyàn Integrated Farming, an integrated circular farm in Lagos, Nigeria.
Shoppers describe what they need for cooking a meal, catering an event, or managing their farm/garden.

Here is the EXACT list of available Sàsàèníyàn products:
1. "Organic Compost Manure" (category: "Organic Manure", unit: "50kg bag") - Rich, fully cured compost from livestock-crop cycle. Restores soil structure, adds micro-organisms, boosts yields organically.
2. "Poultry Manure (Cured)" (category: "Organic Manure", unit: "25kg bag") - Nitrogen-rich, odour-reduced cured poultry manure. Perfect for leafy greens (ugu, spinach), maize, and vegetables.
3. "Fresh Vegetable Basket" (category: "Fresh Produce", unit: "Weekly basket") - Harvested to order: tomatoes, tatashe, ata rodo, fresh ugu (fluted pumpkin), and okra.
4. "Yam & Plantain" (category: "Fresh Produce", unit: "Per tuber / bunch") - Farm-gate fresh yam tubers and plantain bunches straight from the fields.
5. "Farm Fresh Eggs" (category: "Livestock", unit: "Crate of 30") - Free-range eggs with rich yolks, natural feed, zero hormones.
6. "Live & Dressed Chicken" (category: "Livestock", unit: "Per bird") - Healthy broilers and old layers, available live or hygienically dressed and packed.
7. "Farm Box Subscription" (category: "Subscription", unit: "Weekly / monthly") - Curated bundle of fresh produce and eggs delivered recurringly to homes and estates in Lagos.

Based on the shopper's query:
1. Identify whether the user is cooking a meal, working on a farm/garden, or both.
2. Select 1 to 4 most relevant products from the list above. Only pick products from the list.
3. Provide an encouraging, culturally grounded Nigerian culinary or agronomic explanation.
4. Provide a practical tip (cooking advice or farming application instruction).

Respond ONLY with valid JSON in this exact structure:
{
  "category": "meal" | "farm" | "general",
  "headline": "Short snappy summary title",
  "advice": "1 to 2 paragraphs of clear, friendly guidance explaining why these products fit their dish or farming project.",
  "tip": "A specific practical cooking tip or manure application tip.",
  "items": [
    {
      "name": "Exact Name of Product from the list",
      "reason": "Why this specific product is recommended for their need"
    }
  ]
}`;

export async function getProductRecommendations(
  userQuery: string,
  preferredCategory: "all" | "meal" | "farm" = "all",
): Promise<RecommendationResult> {
  const query = userQuery.trim();
  if (!query) {
    throw new Error("Please enter what you are looking to cook or grow.");
  }

  // 1. Try calling the AI Gateway
  try {
    const gatewayUrl =
      (typeof import.meta !== "undefined" && import.meta.env?.VITE_AI_GATEWAY_URL) ||
      "https://ai.gateway.lovable.dev/v1/chat/completions";

    const apiKey =
      (typeof import.meta !== "undefined" &&
        (import.meta.env?.VITE_LOVABLE_API_KEY ||
          import.meta.env?.VITE_AI_GATEWAY_API_KEY ||
          import.meta.env?.LOVABLE_API_KEY)) ||
      "";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    const contextPrefix =
      preferredCategory === "meal"
        ? "Shopper wants help cooking/eating: "
        : preferredCategory === "farm"
          ? "Shopper wants help farming/gardening/soil: "
          : "";

    const response = await fetch(gatewayUrl, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `${contextPrefix}${query}` },
        ],
        temperature: 0.4,
      }),
    });

    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const parsed = parseAiResponse(content);
        if (parsed && parsed.items?.length > 0) {
          const matchedProducts = mapItemsToProducts(parsed.items);
          if (matchedProducts.length > 0) {
            return {
              query,
              category: parsed.category ?? detectCategory(query),
              headline: parsed.headline ?? "Recommended for your needs",
              advice: parsed.advice,
              tip: parsed.tip,
              recommended: matchedProducts,
              source: "ai-gateway",
            };
          }
        }
      }
    }
  } catch {
    // If AI Gateway fails (network, 401, CORS, timeout), fall through to local smart engine
  }

  // 2. Local Smart Recommendation Engine fallback
  return generateSmartLocalRecommendation(query, preferredCategory);
}

function parseAiResponse(raw: string): {
  category?: "meal" | "farm" | "general";
  headline?: string;
  advice: string;
  tip?: string;
  items: Array<{ name: string; reason: string }>;
} | null {
  try {
    const cleaned = raw.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

function mapItemsToProducts(
  items: Array<{ name: string; reason: string }>,
): Array<{ product: Product; reason: string }> {
  const result: Array<{ product: Product; reason: string }> = [];

  for (const item of items) {
    const normalizedItemName = item.name.toLowerCase();
    const found = products.find((p) => {
      const pName = p.name.toLowerCase();
      return (
        pName === normalizedItemName ||
        pName.includes(normalizedItemName) ||
        normalizedItemName.includes(pName)
      );
    });

    if (found && !result.some((r) => r.product.name === found.name)) {
      result.push({
        product: found,
        reason: item.reason || found.desc,
      });
    }
  }

  return result;
}

function detectCategory(q: string): "meal" | "farm" | "general" {
  const lower = q.toLowerCase();
  const farmKeywords = [
    "soil",
    "manure",
    "compost",
    "fertiliz",
    "fertiliser",
    "plant",
    "farm",
    "acre",
    "plot",
    "seed",
    "maize",
    "crop",
    "yield",
    "nitrogen",
    "garden",
    "tree",
    "cassava",
    "grow",
  ];
  const mealKeywords = [
    "cook",
    "soup",
    "stew",
    "rice",
    "jollof",
    "yam",
    "plantain",
    "egg",
    "chicken",
    "efo",
    "egusi",
    "okra",
    "pepper",
    "tomato",
    "roast",
    "meal",
    "dinner",
    "lunch",
    "breakfast",
    "eat",
    "family",
    "party",
    "food",
    "box",
  ];

  const hasFarm = farmKeywords.some((k) => lower.includes(k));
  const hasMeal = mealKeywords.some((k) => lower.includes(k));

  if (hasFarm && !hasMeal) return "farm";
  if (hasMeal && !hasFarm) return "meal";
  return hasFarm ? "farm" : "meal";
}

/**
 * High-precision local semantic recommendation engine based on Nigerian culinary
 * dishes, household needs, and regenerative farming practices.
 */
function generateSmartLocalRecommendation(
  query: string,
  preferredCategory: "all" | "meal" | "farm",
): RecommendationResult {
  const q = query.toLowerCase();
  const cat = preferredCategory !== "all" ? preferredCategory : detectCategory(q);
  const matched: Array<{ product: Product; reason: string }> = [];

  // Helper to safely add
  const add = (name: string, reason: string) => {
    const p = products.find((prod) => prod.name.toLowerCase().includes(name.toLowerCase()));
    if (p && !matched.some((m) => m.product.name === p.name)) {
      matched.push({ product: p, reason });
    }
  };

  let headline = "";
  let advice = "";
  let tip = "";

  if (cat === "farm" || q.includes("soil") || q.includes("manure") || q.includes("compost")) {
    headline = "Regenerative Soil & Farm Recommendation";

    if (q.includes("poultry") || q.includes("nitrogen") || q.includes("leafy") || q.includes("maize")) {
      add(
        "Poultry Manure (Cured)",
        "Rich in slow-release organic nitrogen, vital for rapid vegetative growth and deep green foliage.",
      );
      add(
        "Organic Compost Manure",
        "Improves long-term soil structure, water retention, and microbial biodiversity.",
      );
      advice =
        "For leafy crops, maize, and heavy-feeding vegetables, our cured poultry manure delivers high organic nitrogen without chemical scorching. Pairing with organic compost revitalises soil organic matter.";
      tip =
        "Mix into the top 10–15 cm of soil 5–7 days before transplanting or planting, then water generously to activate soil microbes.";
    } else {
      add(
        "Organic Compost Manure",
        "Fully cured humus-rich compost that rebuilds exhausted soil and restores microbial life.",
      );
      add(
        "Poultry Manure (Cured)",
        "Gives crops an organic nutrient boost during active growth phases.",
      );
      advice =
        "Healthy crops start with living soil. Our cured organic compost conditions depleted Lagos soils, prevents compaction, and feeds crops continuously through harvest season.";
      tip =
        "Apply 1 handful around the base of vegetable beds or 1 bag per 10–15 square metres for broad enrichment.";
    }
  } else {
    // Culinary / Meal requests
    if (q.includes("jollof") || q.includes("stew") || q.includes("rice") || q.includes("party")) {
      headline = "Classic Nigerian Feast & Stew Essentials";
      add(
        "Fresh Vegetable Basket",
        "Includes farm-fresh tatashe, ata rodo, ripe tomatoes and aromatic herbs harvested directly from our fields.",
      );
      add(
        "Live & Dressed Chicken",
        "Clean, flavourful farm-raised chicken perfect for rich stock and golden fried or grilled meat.",
      );
      add(
        "Farm Fresh Eggs",
        "Rich-yolk farm eggs, perfect for side servings or breakfast treats.",
      );
      advice =
        "For a rich, smoky Nigerian stew or celebration jollof, fresh peppers with high natural sweetness and flavourful farm-raised chicken make all the difference. Our vegetables are picked to order, so they retain their natural oils and aroma.";
      tip =
        "Blend your tatashe and tomatoes with minimum water and boil down the paste before frying for that deep authentic Lagos party flavour.";
    } else if (q.includes("yam") || q.includes("plantain") || q.includes("pounded") || q.includes("dodo") || q.includes("efo") || q.includes("egusi") || q.includes("soup")) {
      headline = "Authentic Swallows, Soups & Plantain Essentials";
      add(
        "Yam & Plantain",
        "Firm, starchy farm-gate yam tubers that pound smoothly, alongside naturally ripened plantains.",
      );
      add(
        "Fresh Vegetable Basket",
        "Crisp fluted pumpkin (ugu), fresh okra, and fiery ata rodo for deep native flavour.",
      );
      add(
        "Live & Dressed Chicken",
        "Tender, naturally raised chicken for delicious native soup stock.",
      );
      advice =
        "Our farm-gate yams provide the ideal dry starch content for fluffy pounded yam or boiled yam with egg sauce. Paired with fresh garden ugu and peppers, you get unmatched aroma and nutrition.";
      tip =
        "Toss fresh chopped ugu into your soup right before turning off the heat to preserve its vibrant green colour and vitamins.";
    } else if (q.includes("egg") || q.includes("breakfast") || q.includes("protein") || q.includes("healthy")) {
      headline = "High-Protein Fresh Farm Breakfast";
      add(
        "Farm Fresh Eggs",
        "Free-range eggs with bright, creamy yolks from hens fed natural grain rations.",
      );
      add(
        "Fresh Vegetable Basket",
        "Fresh tomatoes, onions, and peppers for the ultimate Nigerian egg scramble or sauce.",
      );
      add(
        "Yam & Plantain",
        "Sweet ripe plantains for fried dodo or boiled plantain alongside your eggs.",
      );
      advice =
        "Fuel your mornings with natural, hormone-free energy. Fresh farm eggs paired with pan-seared peppers and ripe dodo deliver the quintessential wholesome Nigerian breakfast.";
      tip =
        "Store your fresh eggs pointed-end down in a cool pantry or fridge to keep the air cell intact and maintain peak freshness.";
    } else if (q.includes("week") || q.includes("month") || q.includes("family") || q.includes("sub") || q.includes("home")) {
      headline = "Farm-to-Door Household Pantry Supply";
      add(
        "Farm Box Subscription",
        "Regular recurring delivery of vegetables, roots, and eggs right to your Lagos doorstep.",
      );
      add(
        "Fresh Vegetable Basket",
        "Weekly fresh peppers, tomatoes, and greens tailored to household consumption.",
      );
      add(
        "Farm Fresh Eggs",
        "A steady supply of clean, fresh eggs for family breakfasts and baking.",
      );
      advice =
        "Skip the stressful open market trips. We harvest your produce the morning of delivery and bring clean, traceable Nigerian farm goods straight to your kitchen.";
      tip =
        "Our Farm Box can be customized weekly on WhatsApp to match your exact family menu.";
    } else {
      // General match
      headline = "Curated Sàsàèníyàn Farm Selection";
      add(
        "Fresh Vegetable Basket",
        "Harvested-to-order Nigerian vegetables: tomatoes, peppers, ugu, and okra.",
      );
      add(
        "Live & Dressed Chicken",
        "Healthy, antibiotic-conscious farm chicken for hearty home meals.",
      );
      add(
        "Farm Fresh Eggs",
        "Wholesome free-range eggs for versatile daily nourishment.",
      );
      advice =
        "Based on your request, these direct-from-farm essentials will provide fresh, nutrient-dense nutrition grown with care right here in Lagos.";
      tip =
        "Everything is harvested fresh when you order. Tap the button below to confirm today's farm-gate price on WhatsApp.";
    }
  }

  // Ensure at least one product
  if (matched.length === 0) {
    add("Fresh Vegetable Basket", "Fresh vegetables straight from our Lagos soil.");
    add("Farm Fresh Eggs", "Clean farm eggs from free-range layers.");
  }

  return {
    query,
    category: cat,
    headline,
    advice,
    tip,
    recommended: matched,
    source: "fallback-engine",
  };
}

export function buildWhatsAppOrderMessage(
  query: string,
  recommended: Array<{ product: Product; reason: string }>,
  customerName?: string,
  zone?: string,
): string {
  const msg = draftAiRecommendationMessage({
    query,
    recommended,
    customerName,
    zone,
  });
  return buildWhatsAppLink(msg);
}
