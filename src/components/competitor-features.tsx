import { useState } from "react";
import {
  TrendingDown,
  ShoppingBag,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Percent,
  Truck,
  HeartHandshake,
  Plus,
} from "lucide-react";
import {
  valueBundles,
  deliveryZones,
  buildMultiItemOrderLink,
  orderLink,
} from "@/lib/site";
import {
  buildWhatsAppLink,
  draftProductOrderMessage,
  draftPallySplitMessage,
  draftGeneralInquiryMessage,
} from "@/lib/whatsapp";
import { useBasket } from "@/lib/basket-store";

export function CompetitorValueFeatures() {
  const { addItem } = useBasket();
  // 1. Savings Calculator State
  const [householdType, setHouseholdType] = useState<"small" | "family" | "vendor" | "farm">("family");

  // 2. Delivery Zone State
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(0);

  // 3. Pally Group Splitter State
  const [pallySplits, setPallySplits] = useState(3);
  const [activeBundleId, setActiveBundleId] = useState<string | null>(null);

  const savingsData = {
    small: {
      label: "Small Household (1–2 People)",
      farmCost: 28000,
      marketCost: 40000,
      savingPercent: 30,
      highlights: "Weekly fresh vegetables, 1 crate of eggs, yams & plantain",
    },
    family: {
      label: "Family Household (4–8 People)",
      farmCost: 55000,
      marketCost: 82000,
      savingPercent: 33,
      highlights: "Bi-weekly produce box, 2 dressed chickens, 2 crates of eggs, plantains",
    },
    vendor: {
      label: "Restaurant / Food Vendor",
      farmCost: 140000,
      marketCost: 215000,
      savingPercent: 35,
      highlights: "Bulk tatashe, ata rodo, tomatoes, and weekly layer/broiler supply",
    },
    farm: {
      label: "Smallholder / Urban Farm (1–2 Plots)",
      farmCost: 48000,
      marketCost: 74000,
      savingPercent: 35,
      highlights: "3x 50kg Organic Compost + 2x 25kg Cured Poultry Manure",
    },
  }[householdType];

  const monthlySavings = savingsData.marketCost - savingsData.farmCost;

  return (
    <div className="space-y-16">
      {/* SECTION 1: Interactive Farm-Gate Savings Calculator */}
      <div className="overflow-hidden rounded-3xl bg-secondary p-6 sm:p-10 ring-1 ring-border shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            <Percent className="h-4 w-4" />
            <span>FARM-GATE VS. OPEN MARKET CALCULATOR</span>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            Benchmark: Mile 12 &amp; Ketu Market Rates
          </span>
        </div>

        <div className="mt-4 max-w-2xl">
          <h3 className="font-display text-3xl sm:text-4xl font-bold">
            See How Much You Save Buying Direct from Farm
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Eliminating 3 to 5 middlemen not only gives you produce harvested the day of delivery, but cuts out wholesale-retail markups entirely.
          </p>
        </div>

        {/* Household / Farm Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              ["small", "1–2 People"],
              ["family", "Family (4–8 People)"],
              ["vendor", "Restaurant / Caterer"],
              ["farm", "Farm / 1–2 Plots"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setHouseholdType(key)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                householdType === key
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card text-card-foreground ring-1 ring-border hover:bg-background"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Calculation Summary Card */}
        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-center rounded-2xl bg-card p-6 sm:p-8 ring-1 ring-border">
          <div className="space-y-4 md:col-span-7">
            <p className="text-xs font-bold uppercase tracking-wider text-soil">
              {savingsData.label} · Monthly Basket Estimate
            </p>
            <p className="text-sm font-semibold text-foreground/90">
              {savingsData.highlights}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl bg-secondary/80 p-3.5 border border-border">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase">Sàsàèníyàn Farm-Gate</span>
                <p className="mt-1 font-display text-2xl font-bold text-primary">
                  ₦{savingsData.farmCost.toLocaleString()}
                </p>
                <span className="text-[10px] text-primary font-bold">✓ Direct from our soil</span>
              </div>

              <div className="rounded-xl bg-destructive/10 p-3.5 border border-destructive/20">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase">Open Market / Retail</span>
                <p className="mt-1 font-display text-2xl font-bold text-muted-foreground line-through">
                  ₦{savingsData.marketCost.toLocaleString()}
                </p>
                <span className="text-[10px] text-destructive font-bold">Includes middlemen fees</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl bg-forest p-6 text-center text-forest-foreground md:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-lime">Estimated Monthly Savings</span>
            <p className="mt-2 font-display text-4xl sm:text-5xl font-bold text-lime">
              ₦{monthlySavings.toLocaleString()}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-lime/20 px-3 py-1 text-xs font-bold text-lime">
              <TrendingDown className="h-3.5 w-3.5" />
              Save {savingsData.savingPercent}% on average
            </span>

            <a
              href={buildWhatsAppLink(
                draftProductOrderMessage({
                  productName: `${savingsData.label} Monthly Farm-Gate Plan`,
                  approxPrice: `Save ~₦${monthlySavings.toLocaleString()}/mo (${savingsData.savingPercent}% savings)`,
                }),
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-accent-foreground hover:brightness-95 transition"
            >
              <span>Lock Farm-Gate Prices on WhatsApp</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 2: Curated Value Bundles (Soup/Stew, Protein Pack, Soil Pack) */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1.5 text-xs font-bold text-accent-foreground">
              <ShoppingBag className="h-4 w-4 text-soil" />
              <span>CURATED VALUE BUNDLES</span>
            </div>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
              Packed for Maximum Value &amp; Convenience
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">
              Inspired by the most requested household and farm setups. Ready-to-cook meal kits and complete soil fertility packs.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {valueBundles.map((b) => (
            <div
              key={b.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-xs transition duration-300 hover:shadow-md"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={b.image}
                    alt={b.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-md bg-forest/90 px-2.5 py-1 text-xs font-bold text-lime backdrop-blur-xs">
                    {b.savingsBadge}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-soil">{b.tagline}</span>
                  <h4 className="mt-1 font-display text-2xl font-bold">{b.name}</h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{b.desc}</p>

                  <div className="mt-4 rounded-xl bg-secondary/80 p-3.5 border border-border">
                    <span className="text-[11px] font-bold text-foreground block mb-2">What's Inside:</span>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {b.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span>Portion:</span>
                  <span className="text-foreground">{b.servingsOrSize}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => addItem({ name: b.name, unit: b.servingsOrSize, image: b.image, category: "Value Bundle" })}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-2.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add to Basket</span>
                  </button>
                  <a
                    href={buildWhatsAppLink(
                      draftProductOrderMessage({
                        productName: b.name,
                        unit: b.servingsOrSize,
                      }),
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition"
                  >
                    <span>WhatsApp</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: "Pally" Group Buying / Bulk Split Feature */}
      <div className="rounded-3xl bg-forest text-forest-foreground p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-lime/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime/20 px-3.5 py-1 text-xs font-bold text-lime">
            <Users className="h-3.5 w-3.5" />
            <span>COMMUNITY GROUP BUYING ("PALLY")</span>
          </div>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            Split Bulk Farm Orders with Neighbours &amp; Friends
          </h3>
          <p className="mt-2 text-sm opacity-85 leading-relaxed">
            Just like Pricepally’s collaborative buying model: team up with estate neighbours, church members, or colleagues to split a 50kg bag of manure or full vegetable baskets, unlocking direct farm wholesale discounts.
          </p>
        </div>

        <div className="relative z-10 mt-8 rounded-2xl bg-forest-foreground/10 p-6 sm:p-8 border border-forest-foreground/15 grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-lime">
              How many people are splitting?
            </p>
            <div className="flex items-center gap-3">
              {[2, 3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => setPallySplits(count)}
                  className={`h-11 w-11 rounded-xl font-display text-lg font-bold transition ${
                    pallySplits === count
                      ? "bg-lime text-forest shadow-md scale-105"
                      : "bg-forest-foreground/15 text-forest-foreground hover:bg-forest-foreground/25"
                  }`}
                >
                  {count}
                </button>
              ))}
              <span className="text-xs opacity-75">people sharing one bulk order</span>
            </div>

            <p className="text-xs opacity-80 leading-relaxed pt-2">
              We package your group order with individual portions clearly labelled so sharing upon delivery in your estate or office is hassle-free.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href={buildWhatsAppLink(
                draftPallySplitMessage({
                  splitCount: pallySplits,
                }),
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-xs font-bold text-forest hover:brightness-105 transition"
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Start Group Order Split ({pallySplits} People)</span>
            </a>
            <p className="text-[11px] text-center opacity-65">
              Available across all Lagos residential estates &amp; offices
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: Lagos Delivery Schedule & Coverage Checker */}
      <div className="rounded-3xl bg-secondary p-6 sm:p-10 ring-1 ring-border">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
            <Truck className="h-4 w-4" />
            <span>LAGOS DELIVERY COVERAGE &amp; SCHEDULE</span>
          </div>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            Know Exactly When Your Food Arrives
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Fresh harvest runs scheduled across Lagos zones to guarantee zero long transit times and preserve crisp vegetable freshness.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deliveryZones.map((z, idx) => (
            <button
              key={z.zone}
              onClick={() => setSelectedZoneIndex(idx)}
              className={`text-left rounded-2xl p-5 border transition ${
                selectedZoneIndex === idx
                  ? "bg-card border-primary ring-2 ring-primary/20 shadow-xs"
                  : "bg-card/70 border-border hover:bg-card"
              }`}
            >
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-4 w-4 shrink-0" />
                <h5 className="font-bold text-sm text-foreground">{z.zone}</h5>
              </div>
              <p className="mt-2.5 text-xs text-muted-foreground line-clamp-2">
                {z.neighborhoods}
              </p>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-[11px] font-semibold text-soil">
                <Clock className="h-3 w-3" />
                <span>{z.schedule}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Zone Deep Dive */}
        <div className="mt-6 rounded-2xl bg-card p-5 sm:p-6 ring-1 ring-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-soil">
              Selected Zone: {deliveryZones[selectedZoneIndex]?.zone}
            </span>
            <p className="text-sm font-semibold text-foreground">
              Neighborhoods: {deliveryZones[selectedZoneIndex]?.neighborhoods}
            </p>
            <p className="text-xs text-muted-foreground">
              {deliveryZones[selectedZoneIndex]?.cutOff} · Delivery on {deliveryZones[selectedZoneIndex]?.schedule}
            </p>
          </div>
          <a
            href={buildWhatsAppLink(
              draftGeneralInquiryMessage({
                topic: `Delivery Schedule & Route Availability for ${deliveryZones[selectedZoneIndex]?.zone}`,
              }),
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition"
          >
            <span>Confirm Delivery in My Area</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* SECTION 5: Farm-Gate Freshness Guarantee Banner */}
      <div className="rounded-2xl border bg-card p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 ring-1 ring-border">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground font-display text-2xl font-bold">
          🛡️
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-display text-xl font-bold">100% Sàsàèníyàn Harvest &amp; Freshness Guarantee</h4>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            All produce is harvested to order within 24–48 hours of dispatch. If any egg, vegetable, or tuber fails to meet your highest standards, report it on WhatsApp within 12 hours for an immediate replacement or full credit.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-primary">
          <ShieldCheck className="h-5 w-5" />
          <span>Zero-Risk Guarantee</span>
        </div>
      </div>
    </div>
  );
}
