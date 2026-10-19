/**
 * Sàsàèníyàn Integrated Farming — WhatsApp Pre-draft Message System
 *
 * Provides professionally drafted, culturally attuned Nigerian business
 * communication templates for every touchpoint across the platform.
 */

// Centralized phone numbers with environment override support
const RAW_WHATSAPP =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_WHATSAPP_NUMBER) ||
  "2347061241898";

const RAW_PHONE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_PHONE_NUMBER) ||
  "+234 706 124 1898";

/**
 * Strips all non-digit characters to ensure valid wa.me URLs.
 * If number starts with 0 (Nigerian local format e.g. 07061241898), converts to 2347061241898.
 */
export function sanitizeWhatsAppNumber(num: string = RAW_WHATSAPP): string {
  const digitsOnly = num.replace(/\D/g, "");
  if (digitsOnly.startsWith("0") && digitsOnly.length === 11) {
    return "234" + digitsOnly.slice(1);
  }
  return digitsOnly || "2347061241898";
}

export const WHATSAPP_NUMBER = sanitizeWhatsAppNumber(RAW_WHATSAPP);
export const DISPLAY_PHONE = RAW_PHONE;

/**
 * Builds a direct wa.me link with encoded pre-draft message text.
 */
export function buildWhatsAppLink(message: string, customNumber?: string): string {
  const number = sanitizeWhatsAppNumber(customNumber || WHATSAPP_NUMBER);
  return `https://wa.me/${number}?text=${encodeURIComponent(message.trim())}`;
}

// ---------------------------------------------------------------------------
// PROFESSIONAL TEMPLATE BUILDERS
// ---------------------------------------------------------------------------

/**
 * Template 1: Single Product or Bundle Order
 */
export function draftProductOrderMessage(params: {
  productName: string;
  unit?: string;
  approxPrice?: string;
  customerName?: string;
  deliveryZone?: string;
}): string {
  const { productName, unit, approxPrice, customerName, deliveryZone } = params;
  const nameLine = customerName ? ` from ${customerName}` : "";
  const unitLine = unit ? ` (${unit})` : "";
  const priceLine = approxPrice ? ` [Est. Farm Price: ${approxPrice}]` : "";
  const zoneLine = deliveryZone ? `\n📍 Preferred Delivery Zone: ${deliveryZone}` : "";

  return `Good day, Sàsàèníyàn Integrated Farm Team,

Trust this message finds you well.

I would like to place an order${nameLine} for:
• 1x ${productName}${unitLine}${priceLine}${zoneLine}

Kindly confirm:
1. Availability and today's farm-gate price
2. Estimated delivery schedule to my area

Thank you and best regards,
${customerName || "Valued Customer"}`;
}

/**
 * Template 2: Consolidated Multi-Item Basket Order
 */
export function draftBasketOrderMessage(params: {
  items: Array<{ name: string; qty: number; unit: string; price?: string }>;
  zone?: string;
  deliveryAddress?: string;
  isPallySplit?: boolean;
  splitCount?: number;
  customerName?: string;
  customerPhone?: string;
  specialInstructions?: string;
}): string {
  const {
    items,
    zone,
    deliveryAddress,
    isPallySplit,
    splitCount,
    customerName,
    customerPhone,
    specialInstructions,
  } = params;

  const validItems = items.filter((i) => i.qty > 0);
  const itemsList =
    validItems.length > 0
      ? validItems
          .map(
            (i) =>
              `• ${i.qty}x ${i.name} (${i.unit})${i.price ? ` — ${i.price}` : ""}`,
          )
          .join("\n")
      : "• (No items specified yet — requesting full farm catalog)";

  const totalUnits = validItems.reduce((acc, i) => acc + i.qty, 0);

  let pallyBlock = "";
  if (isPallySplit && splitCount && splitCount > 1) {
    pallyBlock = `\n\n👥 PALLY / GROUP BUYING NOTICE:
This is a shared group order split across ${splitCount} families/colleagues.
Kindly package with individual portions clearly labelled for easy estate distribution.`;
  }

  let addressBlock = "";
  if (deliveryAddress && deliveryAddress.trim()) {
    addressBlock = `\n🏠 Delivery Address / Estate: ${deliveryAddress.trim()}`;
  }

  let contactBlock = "";
  if (customerPhone && customerPhone.trim()) {
    contactBlock = `\n📞 Callback Number: ${customerPhone.trim()}`;
  }

  let instructionsBlock = "";
  if (specialInstructions && specialInstructions.trim()) {
    instructionsBlock = `\n📝 Special Notes: ${specialInstructions.trim()}`;
  }

  return `Good day, Sàsàèníyàn Integrated Team,

Trust you are having a productive day.

I would like to place a consolidated farm order${customerName ? ` for ${customerName}` : ""}:

📋 ORDER SUMMARY (${totalUnits} total unit${totalUnits === 1 ? "" : "s"}):
${itemsList}

📍 Delivery Destination: ${zone || "Lagos Metropolis"}${addressBlock}${contactBlock}${instructionsBlock}${pallyBlock}

Kindly review this order, confirm stock availability, and share today's farm-gate invoice and delivery schedule.

Thank you very much,
${customerName || "Customer"}`;
}

/**
 * Template 3: Pally Group Buying / Community Split
 */
export function draftPallySplitMessage(params: {
  splitCount: number;
  itemOrBundle?: string;
  deliveryZone?: string;
  organizerName?: string;
}): string {
  const { splitCount, itemOrBundle, deliveryZone, organizerName } = params;
  const itemText = itemOrBundle
    ? `specifically for "${itemOrBundle}"`
    : "for fresh produce, poultry, and organic manure";

  return `Good day, Sàsàèníyàn Integrated Team,

My name is ${organizerName || "a community coordinator"}. We are organizing a "Pally" group buy ${itemText} split across ${splitCount} people in our neighbourhood/office.

📍 Target Delivery Area: ${deliveryZone || "Lagos"}

Could you please share:
1. Current bulk farm-gate discount rates for a ${splitCount}-way split
2. How the items will be portioned and labelled
3. Next available dispatch date to our area

Looking forward to your prompt response.

Best regards,
${organizerName || "Group Coordinator"}`;
}

/**
 * Template 4: AI Farm & Meal Assistant Order
 */
export function draftAiRecommendationMessage(params: {
  query: string;
  category?: "meal" | "farm" | "mixed";
  recommended: Array<{ product: { name: string; unit: string; approxFarmPrice?: string }; reason: string }>;
  customerName?: string;
  zone?: string;
}): string {
  const { query, recommended, customerName, zone } = params;

  const itemsList = recommended
    .map(
      (r) =>
        `• ${r.product.name} (${r.product.unit}) — ${r.reason}`,
    )
    .join("\n");

  return `Good day, Sàsàèníyàn Integrated Team,

I used your AI Farm & Meal Assistant on your website for the request:
"${query}"

Based on the recommendation, I would like to order:
${itemsList}

📍 Location: ${zone || "Lagos, Nigeria"}

Kindly confirm availability, current farm-gate prices, and delivery details.

Warm regards,
${customerName || "Customer"}`;
}

/**
 * Template 5: B2B Commercial & Institutional Supply
 */
export function draftB2BSupplyMessage(params: {
  businessName?: string;
  businessType?: string;
  weeklyProduceNeeded?: string;
  deliveryFrequency?: string;
  contactPerson?: string;
  location?: string;
}): string {
  const {
    businessName,
    businessType,
    weeklyProduceNeeded,
    deliveryFrequency,
    contactPerson,
    location,
  } = params;

  return `Good day, Sàsàèníyàn Commercial Supply Team,

I am reaching out on behalf of ${businessName || "our culinary/retail business"}${businessType ? ` (${businessType})` : ""}${location ? ` based in ${location}` : ""}.

We are looking for a dependable direct-from-farm partner to supply:
${weeklyProduceNeeded ? `• Requirements: ${weeklyProduceNeeded}` : "• Steady weekly supplies of Grade-A vegetables, peppers, eggs, and dressed poultry"}
${deliveryFrequency ? `• Expected Delivery Frequency: ${deliveryFrequency}` : "• Scheduled weekly deliveries"}

We would like to:
1. Review your current B2B wholesale pricing catalog
2. Inquire about seasonal price stability contracts
3. Arrange a sample delivery basket for quality assessment

Thank you and we look forward to doing business with you.

Sincerely,
${contactPerson || "Procurement Lead"}
${businessName ? `for ${businessName}` : ""}`;
}

/**
 * Template 6: Soil & Organic Manure Calculation Quotation
 */
export function draftSoilManureQuoteMessage(params: {
  plotLabel: string;
  cropType: string;
  compostBags: number;
  poultryBags: number;
  location?: string;
  farmerName?: string;
}): string {
  const { plotLabel, cropType, compostBags, poultryBags, location, farmerName } = params;

  return `Good day, Sàsàèníyàn Agricultural Inputs Team,

I used your Farm Soil & Manure Calculator for my farm project:

🌱 Land Size: ${plotLabel}
🌾 Crop / Target Cultivation: ${cropType}
📦 Recommended Inputs:
  • ${compostBags}x 50kg Bags of Organic Compost Manure (Humus & Microbes)
  • ${poultryBags}x 25kg Bags of Cured Poultry Manure (Nitrogen-Rich)
${location ? `📍 Farm Location: ${location}\n` : ""}
Kindly provide:
1. Formal quotation including haulage/waybill to our location
2. Expected dispatch timeline
3. Application protocol recommendations

Thank you,
${farmerName || "Farmer / Farm Manager"}`;
}

/**
 * Template 7: Outgrower Network & Farmer Partner Registration
 */
export function draftFarmerRegistrationMessage(params: {
  farmerName: string;
  phone: string;
  farmLocation: string;
  cropOrLivestock: string;
  acreage?: string;
}): string {
  const { farmerName, phone, farmLocation, cropOrLivestock, acreage } = params;

  return `Good day, Sàsàèníyàn Outgrower & Farmer Partnership Desk,

I would like to register my farm for your guaranteed offtake and circular input network:

👨‍🌾 Farmer / Manager Name: ${farmerName}
📞 Phone / WhatsApp: ${phone}
📍 Farm Coordinates / Location: ${farmLocation}
🌾 Current Crops / Livestock: ${cropOrLivestock}
${acreage ? `📏 Farm Size / Acreage: ${acreage}\n` : ""}
I am interested in connecting my harvest to your Lagos buyers and accessing certified organic compost and inputs.

Please advise on the next steps for farm verification and onboarding.

Best regards,
${farmerName}`;
}

/**
 * Template 8: Agritech OS Pilot Early Access
 */
export function draftAgritechPilotMessage(params: {
  role: string;
  contact: string;
  organization?: string;
}): string {
  const { role, contact, organization } = params;

  return `Good day, Sàsàèníyàn Agritech Innovations Team,

I reviewed the product architecture for the Sàsàèníyàn Agritech Digital Platform and would like to request early pilot access.

👤 Interested Role: ${role}
📱 Contact Details: ${contact}
${organization ? `🏢 Organization / Farm: ${organization}\n` : ""}
We are interested in testing:
• Digital farm records & actionable advisories
• Fair farm-to-market produce discovery
• Traceable organic-waste-to-fertilizer circular operations

Please share pilot registration materials and upcoming launch schedules.

Best regards,
${contact}`;
}

/**
 * Template 9: General Customer Service & Freshness Guarantee Inquiry
 */
export function draftGeneralInquiryMessage(params?: {
  topic?: string;
  customerName?: string;
  reference?: string;
}): string {
  const topic = params?.topic || "General Customer Support";
  const name = params?.customerName ? ` from ${params.customerName}` : "";
  const ref = params?.reference ? ` (Ref: ${params.reference})` : "";

  return `Good day, Sàsàèníyàn Integrated Team,

I am reaching out via your website regarding: ${topic}${ref}${name}.

Kindly assist me with more information on your farm-gate products, delivery schedules, and services in Lagos.

Thank you and best regards,
${params?.customerName || "Valued Customer"}`;
}
