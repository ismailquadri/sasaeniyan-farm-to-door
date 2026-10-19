import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import training from "@/assets/training.jpg";
import { OrderButton, PageHero, meta } from "@/components/site";
import {
  buildWhatsAppLink,
  draftSoilManureQuoteMessage,
  draftB2BSupplyMessage,
  draftFarmerRegistrationMessage,
} from "@/lib/whatsapp";
import {
  Sprout,
  Calculator,
  Truck,
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  ShieldCheck,
  Send,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () =>
    meta(
      "Agricultural Services & B2B Offtake — Sàsàèníyàn Integrated",
      "Farm box delivery, bulk supply for supermarkets and restaurants, farmer training, soil advice and circular offtake partnerships in Nigeria.",
      "/services",
    ),
  component: Services,
});

const services = [
  {
    t: "Farm Box Delivery",
    d: "Weekly or monthly boxes of fresh produce and eggs delivered to homes and estates in Lagos.",
    tag: "For Households",
  },
  {
    t: "Bulk Commercial Supply",
    d: "Consistent supply for supermarkets, restaurants, schools and food vendors — fewer steps, better prices.",
    tag: "For Businesses",
  },
  {
    t: "Farmer Training & Extension",
    d: "Practical field training on regenerative farming, composting and integrated crop-livestock systems.",
    tag: "For Farmers",
  },
  {
    t: "Soil & Manure Advisory",
    d: "We calculate the exact volume of cured organic manure needed to restore and maximize your farm yield.",
    tag: "Input Advisory",
  },
  {
    t: "Offtake Partnerships",
    d: "Smallholder farmers sell through our network and reach urban buyers directly, without middlemen.",
    tag: "Market Access",
  },
  {
    t: "Cold Storage & Aggregation",
    d: "Strategic post-harvest handling and cold aggregation that reduces losses and keeps food crisp longer.",
    tag: "Infrastructure",
  },
];

function Services() {
  // Farmer Soil Calculator State
  const [plotSize, setPlotSize] = useState<"1-plot" | "2-plots" | "1-ha" | "5-ha">("2-plots");
  const [cropType, setCropType] = useState<"vegetables" | "maize" | "tubers" | "fruits">("vegetables");

  // Calculation parameters
  const calculation = {
    "1-plot": { compostBags: 6, poultryBags: 3, label: "1 Plot (approx 650 sqm)" },
    "2-plots": { compostBags: 12, poultryBags: 6, label: "2 Plots (approx 1,300 sqm)" },
    "1-ha": { compostBags: 80, poultryBags: 40, label: "1 Hectare (approx 10,000 sqm)" },
    "5-ha": { compostBags: 380, poultryBags: 190, label: "5 Hectares (Commercial Farm)" },
  }[plotSize];

  // Farmer registration form state
  const [farmerName, setFarmerName] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmLocation, setFarmLocation] = useState("Epe / Ibeju-Lekki");
  const [farmCrop, setFarmCrop] = useState("Vegetables & Peppers");
  const [submitted, setSubmitted] = useState(false);

  function handleFarmerSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = draftFarmerRegistrationMessage({
      farmerName,
      phone: farmerPhone,
      farmLocation,
      cropOrLivestock: farmCrop,
    });
    window.open(buildWhatsAppLink(msg), "_blank");
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Services &amp; Partnerships"
        title="More than a farm. A complete agricultural system."
        text="We help households eat better, food businesses source smarter, and smallholders maximize their yield and income."
      />

      {/* Services Grid */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.t} className="rounded-2xl bg-card p-7 ring-1 ring-border shadow-xs hover:shadow-md transition">
              <span className="text-[11px] font-bold uppercase tracking-wider text-soil">{s.tag}</span>
              <h3 className="mt-2 text-2xl font-bold">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Acreage & Soil Input Advisory Calculator (Competitor Benchmarked) */}
      <section className="bg-secondary/70 py-20 border-y border-border">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-bold text-primary">
              <Calculator className="h-3.5 w-3.5" />
              <span>AGRONOMIC INPUT ADVISORY</span>
            </div>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
              Farm Acreage &amp; Organic Manure Calculator
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Calculate the optimal organic compost and cured poultry manure application rate based on your acreage and crop type.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Input Selectors */}
            <div className="space-y-6 lg:col-span-6 bg-card p-6 sm:p-8 rounded-2xl ring-1 ring-border">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Select Farm / Land Size
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(
                    [
                      ["1-plot", "1 Plot (650 sqm)"],
                      ["2-plots", "2 Plots (1,300 sqm)"],
                      ["1-ha", "1 Hectare (2.5 Acres)"],
                      ["5-ha", "5 Hectares (Commercial)"],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPlotSize(val)}
                      className={`rounded-xl p-3 text-xs font-bold transition text-left border ${
                        plotSize === val
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary/70 text-foreground border-border hover:bg-secondary"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Target Crop
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(
                    [
                      ["vegetables", "Vegetables & Leafy Greens"],
                      ["maize", "Maize & Grain Cereals"],
                      ["tubers", "Yam & Cassava Tubers"],
                      ["fruits", "Pepper, Tomatoes & Plantain"],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setCropType(val)}
                      className={`rounded-xl p-3 text-xs font-bold transition text-left border ${
                        cropType === val
                          ? "bg-forest text-forest-foreground border-forest"
                          : "bg-secondary/70 text-foreground border-border hover:bg-secondary"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Recommendation Card */}
            <div className="lg:col-span-6 rounded-2xl bg-forest text-forest-foreground p-6 sm:p-8 border border-forest-foreground/15 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lime">Recommended Input Plan</span>
                <h4 className="mt-1 font-display text-2xl font-bold">
                  {calculation.label}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-forest-foreground/10 p-4 border border-forest-foreground/15">
                  <span className="text-[11px] opacity-75 font-semibold uppercase block">50kg Organic Compost</span>
                  <p className="mt-1 font-display text-3xl font-bold text-lime">{calculation.compostBags} bags</p>
                  <span className="text-[10px] opacity-70">Long-term soil structure</span>
                </div>

                <div className="rounded-xl bg-forest-foreground/10 p-4 border border-forest-foreground/15">
                  <span className="text-[11px] opacity-75 font-semibold uppercase block">25kg Cured Poultry</span>
                  <p className="mt-1 font-display text-3xl font-bold text-accent">{calculation.poultryBags} bags</p>
                  <span className="text-[10px] opacity-70">High-nitrogen vegetative boost</span>
                </div>
              </div>

              <div className="text-xs opacity-80 leading-relaxed border-t border-forest-foreground/15 pt-4">
                💡 <strong>Application Protocol:</strong> Work cured compost into soil 5–7 days before planting. Top-dress with cured poultry manure 2–3 weeks after emergence or first weeding for maximum nutrient absorption.
              </div>

              <a
                href={buildWhatsAppLink(
                  draftSoilManureQuoteMessage({
                    plotLabel: calculation.label,
                    cropType,
                    compostBags: calculation.compostBags,
                    poultryBags: calculation.poultryBags,
                    farmerName: farmerName.trim() || undefined,
                    location: farmLocation || "Lagos / Farm Project",
                  }),
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold text-accent-foreground hover:brightness-95 transition"
              >
                <span>Request Quotation on WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Commercial Supply for Supermarkets & Restaurants */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-3xl bg-card border ring-1 ring-border p-8 sm:p-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3.5 py-1 text-xs font-bold text-accent-foreground">
              <Building2 className="h-3.5 w-3.5" />
              <span>B2B INSTITUTIONAL SUPPLY</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold">
              Reliable Bulk Supply for Restaurants, Supermarkets &amp; Hotels
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We contract with commercial food businesses to provide steady weekly deliveries of grade-A tomatoes, peppers, eggs, and dressed poultry. Lock in seasonal price stability and skip the headache of daily market runs.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-semibold text-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Scheduled Weekly Invoicing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Zero Middlemen Markups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Traceable Organic Origin</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Dedicated Logistics Van</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3 rounded-2xl bg-secondary/80 p-6 border border-border">
            <h4 className="font-bold text-base">Request B2B Wholesale Catalog</h4>
            <p className="text-xs text-muted-foreground">
              Speak with our commercial supply coordinator to arrange a sample basket and review bulk contract rates.
            </p>
            <a
              href={buildWhatsAppLink(
                draftB2BSupplyMessage({
                  businessType: "Restaurant / Supermarket / Hotel / Caterer",
                  weeklyProduceNeeded: "Steady weekly grade-A vegetables, peppers, eggs, and dressed poultry",
                  deliveryFrequency: "Weekly scheduled cold-chain delivery",
                }),
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold text-primary-foreground hover:opacity-90 transition"
            >
              <span>Connect with B2B Lead</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Farmer Network Onboarding Section */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid overflow-hidden rounded-3xl bg-forest text-forest-foreground lg:grid-cols-12">
          <div className="lg:col-span-5 relative min-h-[300px]">
            <img
              src={training}
              alt="Agronomist training Nigerian farmers in the field"
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="p-8 sm:p-12 lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-lime">Farmer Outgrower Network</span>
              <h3 className="mt-2 text-3xl sm:text-4xl font-display font-bold">Are You a Smallholder Farmer?</h3>
              <p className="mt-2 text-sm opacity-80 leading-relaxed">
                Join our network in Lagos and Ogun. Get subsidized organic manure, soil advisory, and guaranteed purchase of your fresh harvest at fair prices.
              </p>
            </div>

            <form onSubmit={handleFarmerSubmit} className="space-y-3.5">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="rounded-xl border border-forest-foreground/30 bg-forest-foreground/10 px-4 py-2.5 text-xs text-forest-foreground placeholder:text-forest-foreground/50 outline-none focus:border-lime"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp Number"
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  className="rounded-xl border border-forest-foreground/30 bg-forest-foreground/10 px-4 py-2.5 text-xs text-forest-foreground placeholder:text-forest-foreground/50 outline-none focus:border-lime"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Farm Location (e.g. Epe, Ikorodu, Sagamu)"
                  value={farmLocation}
                  onChange={(e) => setFarmLocation(e.target.value)}
                  className="rounded-xl border border-forest-foreground/30 bg-forest-foreground/10 px-4 py-2.5 text-xs text-forest-foreground placeholder:text-forest-foreground/50 outline-none focus:border-lime"
                />
                <input
                  type="text"
                  required
                  placeholder="Crops Grown (e.g. Pepper, Ugu, Maize)"
                  value={farmCrop}
                  onChange={(e) => setFarmCrop(e.target.value)}
                  className="rounded-xl border border-forest-foreground/30 bg-forest-foreground/10 px-4 py-2.5 text-xs text-forest-foreground placeholder:text-forest-foreground/50 outline-none focus:border-lime"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 text-xs font-bold text-forest hover:brightness-105 transition"
              >
                <span>Register Farm for Offtake on WhatsApp</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
