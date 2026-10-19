import manure from "@/assets/manure.jpg";
import poultryManure from "@/assets/poultry_manure.jpg";
import biochar from "@/assets/biochar.jpg";
import biofertilizer from "@/assets/biofertilizer.jpg";
import produce from "@/assets/produce.jpg";
import yam from "@/assets/yam.jpg";
import plantain from "@/assets/plantain.jpg";
import peppers from "@/assets/peppers.jpg";
import corn from "@/assets/corn.jpg";
import eggs from "@/assets/eggs.jpg";
import chicken from "@/assets/chicken.jpg";
import poultry from "@/assets/poultry.jpg";
import honey from "@/assets/honey.jpg";

import soupPack from "@/assets/soup_pack.jpg";
import soilPack from "@/assets/soil_pack.jpg";
import proteinPack from "@/assets/protein_pack.jpg";

import {
  WHATSAPP_NUMBER,
  DISPLAY_PHONE,
  buildWhatsAppLink,
  draftProductOrderMessage,
  draftGeneralInquiryMessage,
  draftBasketOrderMessage,
} from "./whatsapp";

export const PHONE = DISPLAY_PHONE;
export const WHATSAPP = WHATSAPP_NUMBER;
export const ADDRESS = "11, Shogunle Close, Aboru, Iyana-Ipaja, Lagos State";

export function orderLink(item?: string, customerName?: string) {
  if (item) {
    const msg = draftProductOrderMessage({
      productName: item,
      customerName,
    });
    return buildWhatsAppLink(msg);
  }
  return buildWhatsAppLink(draftGeneralInquiryMessage({ topic: "Farm-Gate Order & Pricing", customerName }));
}

export type Product = {
  name: string;
  category: string;
  desc: string;
  unit: string;
  image: string;
  badge?: string;
  approxMarketPrice?: string;
  approxFarmPrice?: string;
};

export const products: Product[] = [
  {
    name: "Organic Compost Manure",
    category: "Organic Manure",
    desc: "Rich, fully-cured compost from our circular livestock-crop cycle. Restores depleted topsoil and boosts crop yield.",
    unit: "50kg bag",
    image: manure,
    badge: "Bestseller",
    approxFarmPrice: "₦14,500",
    approxMarketPrice: "₦22,000",
  },
  {
    name: "Poultry Manure (Cured)",
    category: "Organic Manure",
    desc: "Odour-reduced, nitrogen-rich cured poultry pellets for vegetables, sweet maize, and leafy greens.",
    unit: "25kg bag",
    image: poultryManure,
    badge: "High-Nitrogen",
    approxFarmPrice: "₦9,500",
    approxMarketPrice: "₦15,000",
  },
  {
    name: "Biochar Soil Conditioner",
    category: "Organic Manure",
    desc: "Crushed porous biochar blended with soil microbes. Locks in moisture, aerates clay soil, and prevents nutrient runoff.",
    unit: "20kg bag",
    image: biochar,
    badge: "Soil Rebuilder",
    approxFarmPrice: "₦11,000",
    approxMarketPrice: "₦16,500",
  },
  {
    name: "Liquid Bio-Fertilizer (5L)",
    category: "Organic Manure",
    desc: "Cold-extracted organic nutrient tea rich in humic acids and micronutrients for fast foliar absorption.",
    unit: "5 Litre Jerrycan",
    image: biofertilizer,
    badge: "Fast Absorption",
    approxFarmPrice: "₦8,500",
    approxMarketPrice: "₦13,000",
  },
  {
    name: "Fresh Vegetable Basket",
    category: "Fresh Produce",
    desc: "Tomatoes, tatashe, ata rodo, fresh ugu leaves and tender okra — harvested to order at dawn.",
    unit: "Weekly basket",
    image: produce,
    badge: "Harvested Today",
    approxFarmPrice: "₦18,000",
    approxMarketPrice: "₦26,500",
  },
  {
    name: "Tubers of White Yam",
    category: "Fresh Produce",
    desc: "Farm-gate mature white yam tubers with high dry starch. Pounds fluffy and smooth with zero lumps.",
    unit: "5 Large Tubers",
    image: yam,
    badge: "Grade A Yam",
    approxFarmPrice: "₦16,000",
    approxMarketPrice: "₦24,000",
  },
  {
    name: "Sweet Golden Plantains",
    category: "Fresh Produce",
    desc: "Naturally grown sweet plantain bunches, freshly harvested from our plantation. Perfect for dodo or boiling.",
    unit: "Per Large Bunch",
    image: plantain,
    badge: "Naturally Ripened",
    approxFarmPrice: "₦7,500",
    approxMarketPrice: "₦11,500",
  },
  {
    name: "Ata Rodo & Tatashe Peppers",
    category: "Fresh Produce",
    desc: "Crisp, fiery red Scotch Bonnet and sweet Tatashe bell peppers packed directly in ventilated harvest sacks.",
    unit: "15kg Half Sack",
    image: peppers,
    badge: "Farm-Direct",
    approxFarmPrice: "₦21,000",
    approxMarketPrice: "₦31,000",
  },
  {
    name: "Sweet Yellow Corn (Maize)",
    category: "Fresh Produce",
    desc: "Plump, tender sweet yellow maize ears on the cob. Freshly picked for boiling, roasting, or home processing.",
    unit: "Bag of 50 Cobs",
    image: corn,
    badge: "Fresh Harvest",
    approxFarmPrice: "₦8,000",
    approxMarketPrice: "₦12,500",
  },
  {
    name: "Farm Fresh Eggs",
    category: "Livestock",
    desc: "Eggs from free-range layers fed on clean natural grain and greens. Rich golden yolks and strong shells.",
    unit: "Crate of 30",
    image: eggs,
    badge: "Farm-Gate Grade A",
    approxFarmPrice: "₦6,200",
    approxMarketPrice: "₦8,500",
  },
  {
    name: "Live & Dressed Chicken",
    category: "Livestock",
    desc: "Healthy, naturally raised broilers (2.2kg+ average). Thoroughly dressed and cleaned or live upon request.",
    unit: "Per bird",
    image: chicken,
    badge: "Cleaned & Packed",
    approxFarmPrice: "₦7,800",
    approxMarketPrice: "₦11,000",
  },
  {
    name: "Free-Range Heritage Layers",
    category: "Livestock",
    desc: "Mature heritage layer chickens with deep, rich flavor and firm meat prized for traditional Nigerian pepper soup.",
    unit: "Per bird",
    image: poultry,
    badge: "Pepper Soup Choice",
    approxFarmPrice: "₦5,500",
    approxMarketPrice: "₦8,000",
  },
  {
    name: "Pure Raw Farm Honey",
    category: "Specialty",
    desc: "100% pure, unrefined, raw golden honey from our farm apiary. Unheated and free of sugar additives.",
    unit: "1 Litre Glass Jar",
    image: honey,
    badge: "100% Pure Raw",
    approxFarmPrice: "₦9,000",
    approxMarketPrice: "₦14,000",
  },
];

export type ValueBundle = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  items: string[];
  servingsOrSize: string;
  savingsBadge: string;
  image: string;
};

export const valueBundles: ValueBundle[] = [
  {
    id: "soup-stew-kit",
    name: "Lagos Soup & Stew Feast Pack",
    tagline: "Inspired by Pricepally & FoodLocker soup packs",
    desc: "Everything you need for authentic Nigerian stews and vegetable soups (efo riro, egusi, okra). Freshly harvested peppers, tomatoes, fresh ugu leaves, and farm chicken.",
    items: [
      "1x Fresh Vegetable Basket (Tomatoes, Tatashe, Rodo, Ugu, Okra)",
      "1x Farm-Dressed Whole Chicken (Cleaned & Packed)",
      "1x Crate of 30 Farm Fresh Eggs",
    ],
    servingsOrSize: "Feeds 4–8 people / 1–2 weeks",
    savingsBadge: "Save ~28% vs open market",
    image: soupPack,
  },
  {
    id: "soil-regeneration-pack",
    name: "Regenerative Soil Starter Pack",
    tagline: "For Urban Gardeners & Small Farms",
    desc: "Complete biological boost for 1–2 plots or backyard raised beds. Restores depleted soil, feeds microbial life, and fuels rapid vegetative growth.",
    items: [
      "1x 50kg Organic Compost Manure (Humus & Microbes)",
      "1x 25kg Cured Poultry Manure (High Nitrogen)",
      "1x Biochar Soil Conditioner pack & Free Application Guide",
    ],
    servingsOrSize: "Covers 1–2 plots / 100 sqm garden",
    savingsBadge: "Factory / Farm-Gate Bulk Rate",
    image: soilPack,
  },
  {
    id: "family-protein-box",
    name: "Wholesome Protein & Breakfast Pack",
    tagline: "Direct-from-farm family nourishment",
    desc: "Clean, natural nourishment for busy Lagos households. Eggs from hens on natural feed, fresh broilers, and naturally ripened sweet plantains.",
    items: [
      "2x Crates of Farm Fresh Eggs (60 Eggs total)",
      "2x Whole Farm-Dressed Chickens",
      "1x Bunch Sweet Farm-Gate Plantains",
    ],
    servingsOrSize: "Feeds household for 2–3 weeks",
    savingsBadge: "Save ~32% vs supermarkets",
    image: proteinPack,
  },
];

export type DeliveryZone = {
  zone: string;
  neighborhoods: string;
  schedule: string;
  cutOff: string;
};

export const deliveryZones: DeliveryZone[] = [
  {
    zone: "Lagos Island & Lekki Corridor",
    neighborhoods: "Lekki Phase 1, Ikate, Chevron, Victoria Island, Ikoyi, Ajah, Sangotedo",
    schedule: "Tuesdays, Thursdays & Saturdays",
    cutOff: "Order by 6:00 PM previous day",
  },
  {
    zone: "Lagos Mainland Central",
    neighborhoods: "Ikeja, Maryland, Magodo, Omole, Surulere, Yaba, Gbagada, Anthony",
    schedule: "Wednesdays & Fridays",
    cutOff: "Order by 6:00 PM previous day",
  },
  {
    zone: "Ikorodu, Epe & Farm Gate",
    neighborhoods: "Epe, Ibeju-Lekki, Ikorodu town, Agric, Majidun & Farm Gate Collection",
    schedule: "Daily (Monday – Saturday)",
    cutOff: "Same-day morning dispatch",
  },
  {
    zone: "Nationwide Bulk & Interstate",
    neighborhoods: "Abuja, Port Harcourt, Ibadan, Abeokuta (Truckloads & wholesale orders)",
    schedule: "Arranged per order schedule",
    cutOff: "48-hour dispatch notice",
  },
];

export function buildMultiItemOrderLink(params: {
  items: Array<{ name: string; qty: number; unit: string; price?: string }>;
  zone?: string;
  deliveryAddress?: string;
  isPallySplit?: boolean;
  splitCount?: number;
  customerName?: string;
  customerPhone?: string;
  specialInstructions?: string;
}) {
  const msg = draftBasketOrderMessage({
    items: params.items,
    zone: params.zone,
    deliveryAddress: params.deliveryAddress,
    isPallySplit: params.isPallySplit,
    splitCount: params.splitCount,
    customerName: params.customerName,
    customerPhone: params.customerPhone,
    specialInstructions: params.specialInstructions,
  });
  return buildWhatsAppLink(msg);
}

// Re-export all WhatsApp generators for direct usage across components
export * from "./whatsapp";

