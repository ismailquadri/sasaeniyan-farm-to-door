import { describe, expect, it } from "vitest";
import {
  sanitizeWhatsAppNumber,
  buildWhatsAppLink,
  draftProductOrderMessage,
  draftBasketOrderMessage,
  draftPallySplitMessage,
  draftAiRecommendationMessage,
  draftB2BSupplyMessage,
  draftSoilManureQuoteMessage,
  draftFarmerRegistrationMessage,
  draftAgritechPilotMessage,
  draftGeneralInquiryMessage,
  WHATSAPP_NUMBER,
} from "@/lib/whatsapp";

describe("WhatsApp Pre-Draft System", () => {
  it("sanitizes Nigerian and international phone formats", () => {
    expect(sanitizeWhatsAppNumber("07061241898")).toBe("2347061241898");
    expect(sanitizeWhatsAppNumber("+234 706 124 1898")).toBe("2347061241898");
    expect(sanitizeWhatsAppNumber("234-706-124-1898")).toBe("2347061241898");
    expect(sanitizeWhatsAppNumber("2347061241898")).toBe("2347061241898");
  });

  it("builds a valid wa.me URL with properly encoded query string", () => {
    const link = buildWhatsAppLink("Hello Team");
    expect(link).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Team`);
  });

  it("drafts professional single product order messages", () => {
    const msg = draftProductOrderMessage({
      productName: "Organic Compost Manure",
      unit: "50kg bag",
      approxPrice: "₦14,500",
      customerName: "Mrs. Adebayo",
      deliveryZone: "Lekki Phase 1",
    });

    expect(msg).toContain("Good day, Sàsàèníyàn Integrated Farm Team");
    expect(msg).toContain("Mrs. Adebayo");
    expect(msg).toContain("Organic Compost Manure");
    expect(msg).toContain("50kg bag");
    expect(msg).toContain("₦14,500");
    expect(msg).toContain("Lekki Phase 1");
    expect(msg).toContain("Availability and today's farm-gate price");
  });

  it("drafts professional consolidated basket order with Pally split details", () => {
    const msg = draftBasketOrderMessage({
      items: [
        { name: "Fresh Vegetable Basket", qty: 2, unit: "Weekly basket", price: "₦18,000" },
        { name: "Farm Fresh Eggs", qty: 1, unit: "Crate of 30", price: "₦6,200" },
      ],
      zone: "Ikeja GRA",
      deliveryAddress: "Plot 12, Isaac John Street",
      isPallySplit: true,
      splitCount: 3,
      customerName: "Engr. Babatunde",
      customerPhone: "08031234567",
    });

    expect(msg).toContain("Good day, Sàsàèníyàn Integrated Team");
    expect(msg).toContain("ORDER SUMMARY (3 total units)");
    expect(msg).toContain("2x Fresh Vegetable Basket");
    expect(msg).toContain("1x Farm Fresh Eggs");
    expect(msg).toContain("Ikeja GRA");
    expect(msg).toContain("Plot 12, Isaac John Street");
    expect(msg).toContain("08031234567");
    expect(msg).toContain("PALLY / GROUP BUYING NOTICE");
    expect(msg).toContain("split across 3 families/colleagues");
  });

  it("drafts professional Pally group buying inquiries", () => {
    const msg = draftPallySplitMessage({
      splitCount: 4,
      itemOrBundle: "Lagos Soup & Stew Feast Pack",
      deliveryZone: "Magodo Phase 2",
      organizerName: "Folake",
    });

    expect(msg).toContain("Folake");
    expect(msg).toContain('specifically for "Lagos Soup & Stew Feast Pack"');
    expect(msg).toContain("split across 4 people");
    expect(msg).toContain("Magodo Phase 2");
    expect(msg).toContain("Current bulk farm-gate discount rates");
  });

  it("drafts professional AI Assistant recommendations", () => {
    const msg = draftAiRecommendationMessage({
      query: "Need items for Sunday family jollof rice",
      recommended: [
        { product: { name: "Fresh Vegetable Basket", unit: "Basket" }, reason: "Fresh tomatoes and peppers" },
        { product: { name: "Farm-Dressed Whole Chicken", unit: "Per bird" }, reason: "Clean broiler" },
      ],
      zone: "Victoria Island",
    });

    expect(msg).toContain("AI Farm & Meal Assistant");
    expect(msg).toContain("Need items for Sunday family jollof rice");
    expect(msg).toContain("Fresh Vegetable Basket");
    expect(msg).toContain("Victoria Island");
  });

  it("drafts formal B2B wholesale supply requests", () => {
    const msg = draftB2BSupplyMessage({
      businessName: "Bistro 7 Lagos",
      businessType: "Fine Dining Restaurant",
      location: "Victoria Island",
      weeklyProduceNeeded: "50kg Tomatoes, 20 crates eggs, 40 dressed chickens",
      deliveryFrequency: "Twice weekly (Tuesdays & Fridays)",
      contactPerson: "Chef Michael",
    });

    expect(msg).toContain("Sàsàèníyàn Commercial Supply Team");
    expect(msg).toContain("Bistro 7 Lagos");
    expect(msg).toContain("Chef Michael");
    expect(msg).toContain("50kg Tomatoes");
    expect(msg).toContain("Twice weekly");
    expect(msg).toContain("B2B wholesale pricing catalog");
  });

  it("drafts soil input and fertilizer quotation messages", () => {
    const msg = draftSoilManureQuoteMessage({
      plotLabel: "2 Plots (approx 1,300 sqm)",
      cropType: "Vegetables & Peppers",
      compostBags: 12,
      poultryBags: 6,
      location: "Epe Farm Corridor",
      farmerName: "Deji",
    });

    expect(msg).toContain("Farm Soil & Manure Calculator");
    expect(msg).toContain("2 Plots (approx 1,300 sqm)");
    expect(msg).toContain("12x 50kg Bags of Organic Compost Manure");
    expect(msg).toContain("6x 25kg Bags of Cured Poultry Manure");
    expect(msg).toContain("Epe Farm Corridor");
  });

  it("drafts outgrower registration and pilot access requests", () => {
    const outgrower = draftFarmerRegistrationMessage({
      farmerName: "Pa Jimoh",
      phone: "08022233344",
      farmLocation: "Ibeju-Lekki",
      cropOrLivestock: "Cassava & Sweet Potato",
      acreage: "3 Hectares",
    });
    expect(outgrower).toContain("Pa Jimoh");
    expect(outgrower).toContain("08022233344");
    expect(outgrower).toContain("Cassava & Sweet Potato");

    const pilot = draftAgritechPilotMessage({
      role: "Produce Buyer / Aggregator",
      contact: "tunde@agrodistributors.ng",
      organization: "Lagos Fresh Markets Cooperative",
    });
    expect(pilot).toContain("Produce Buyer / Aggregator");
    expect(pilot).toContain("tunde@agrodistributors.ng");
    expect(pilot).toContain("Lagos Fresh Markets Cooperative");
  });
});
