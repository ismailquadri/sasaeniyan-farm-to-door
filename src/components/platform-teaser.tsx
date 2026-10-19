import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Smartphone,
  Sprout,
  ShoppingBag,
  Recycle,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  WifiOff,
  CloudRain,
  Send,
  Users,
} from "lucide-react";
import { buildWhatsAppLink, draftAgritechPilotMessage } from "@/lib/whatsapp";

type PersonaKey = "farmer" | "buyer" | "circular" | "impact";

export function PlatformTeaser() {
  const [activePersona, setActivePersona] = useState<PersonaKey>("farmer");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistRole, setWaitlistRole] = useState("farmer");
  const [joined, setJoined] = useState(false);

  function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!waitlistEmail) return;
    setJoined(true);
  }

  const roleLabels: Record<string, string> = {
    farmer: "Smallholder Farmer",
    buyer: "Produce Buyer / Aggregator",
    circular: "Waste & Fertilizer Partner",
    investor: "Partner / Impact Investor",
  };

  const whatsappMessage = draftAgritechPilotMessage({
    role: roleLabels[waitlistRole] ?? "Partner",
    contact: waitlistEmail.trim() || "Prospective Partner",
  });
  const whatsappUrl = buildWhatsAppLink(whatsappMessage);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-forest text-forest-foreground p-6 sm:p-10 lg:p-16 ring-1 ring-forest-foreground/15 shadow-2xl">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-lime/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      {/* Top Banner & Eyebrow */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-lime/15 px-4 py-1.5 text-xs font-bold text-lime ring-1 ring-lime/30">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>IN OUR PIPELINE · COMING SOON</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold opacity-75">
          <WifiOff className="h-4 w-4 text-lime" />
          <span>Engineered for Low-Bandwidth &amp; Offline-First</span>
        </div>
      </div>

      {/* Main Pitch */}
      <div className="relative z-10 mt-6 max-w-3xl">
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
          Sàsàèníyàn Agritech: The Digital Operating System for Circular Farming
        </h2>
        <p className="mt-5 text-base sm:text-lg opacity-85 leading-relaxed">
          We are building the complete circular loop for African agriculture. One unified platform bringing together 
          <strong> actionable low-bandwidth farm advisories</strong>, <strong>direct farm-to-market trade</strong>, 
          <strong> waste-to-fertilizer traceability</strong>, and <strong>provable impact data</strong>.
        </p>
      </div>

      {/* Interactive Thriller Showcase (Persona Simulator) */}
      <div className="relative z-10 mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Persona Navigation */}
        <div className="space-y-3 lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-widest text-lime">
            Interactive Sneak Peek · Select a User Role
          </p>

          <button
            onClick={() => setActivePersona("farmer")}
            className={`w-full text-left rounded-2xl p-4 sm:p-5 transition duration-200 border ${
              activePersona === "farmer"
                ? "bg-forest-foreground/15 border-lime shadow-md scale-[1.01]"
                : "bg-forest-foreground/5 border-forest-foreground/10 hover:bg-forest-foreground/10"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/20 text-lime">
                <Sprout className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base sm:text-lg">Smallholder Farmer</h4>
                  <span className="rounded bg-lime/20 px-2 py-0.5 text-[10px] font-bold text-lime uppercase">Aderonke</span>
                </div>
                <p className="mt-1 text-xs opacity-75 leading-relaxed">
                  Weather-triggered crop advisory, low-bandwidth plot logs, and instant produce listing without specialist software.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActivePersona("buyer")}
            className={`w-full text-left rounded-2xl p-4 sm:p-5 transition duration-200 border ${
              activePersona === "buyer"
                ? "bg-forest-foreground/15 border-lime shadow-md scale-[1.01]"
                : "bg-forest-foreground/5 border-forest-foreground/10 hover:bg-forest-foreground/10"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base sm:text-lg">Produce Buyer &amp; Aggregator</h4>
                  <span className="rounded bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent uppercase">Tunde</span>
                </div>
                <p className="mt-1 text-xs opacity-75 leading-relaxed">
                  Real-time harvest window discovery, verified crop grades, zero middleman markups, and dependable fulfilment.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActivePersona("circular")}
            className={`w-full text-left rounded-2xl p-4 sm:p-5 transition duration-200 border ${
              activePersona === "circular"
                ? "bg-forest-foreground/15 border-lime shadow-md scale-[1.01]"
                : "bg-forest-foreground/5 border-forest-foreground/10 hover:bg-forest-foreground/10"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soil/40 text-soil">
                <Recycle className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base sm:text-lg">Circular Operations Coordinator</h4>
                  <span className="rounded bg-soil/30 px-2 py-0.5 text-[10px] font-bold text-lime uppercase">Kemi</span>
                </div>
                <p className="mt-1 text-xs opacity-75 leading-relaxed">
                  Trace organic waste from farm &amp; market collection through composting batches to verified fertilizer distribution.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActivePersona("impact")}
            className={`w-full text-left rounded-2xl p-4 sm:p-5 transition duration-200 border ${
              activePersona === "impact"
                ? "bg-forest-foreground/15 border-lime shadow-md scale-[1.01]"
                : "bg-forest-foreground/5 border-forest-foreground/10 hover:bg-forest-foreground/10"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/20 text-lime">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base sm:text-lg">Verified Impact &amp; Operations</h4>
                  <span className="rounded bg-lime/20 px-2 py-0.5 text-[10px] font-bold text-lime uppercase">Admins &amp; Partners</span>
                </div>
                <p className="mt-1 text-xs opacity-75 leading-relaxed">
                  Provable data ledger: verified hectares, carbon &amp; waste diversion, and real farmer income improvements.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Right Column: Live Mobile / Dashboard Simulation Mockup */}
        <div className="lg:col-span-7">
          <div className="relative mx-auto max-w-md rounded-[2.5rem] border-4 border-forest-foreground/20 bg-card text-card-foreground p-5 sm:p-6 shadow-2xl ring-1 ring-black/40">
            {/* Phone Notch & Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-accent" />
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                Sàsàèníyàn OS v0.9 (Pilot)
              </span>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] font-bold text-primary">LIVE SIM</span>
              </div>
            </div>

            {/* Persona Simulator Screen Contents */}
            <div className="mt-4 min-h-[360px] space-y-4">
              {activePersona === "farmer" && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-soil uppercase tracking-wider">Aderonke's Farm Log</p>
                      <h5 className="font-display text-xl font-bold">Plot B · Fluted Pumpkin (Ugu)</h5>
                    </div>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">Day 42 of 75</span>
                  </div>

                  {/* Weather Advisory Card */}
                  <div className="rounded-2xl bg-secondary/70 p-4 border border-border">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide">
                      <CloudRain className="h-4 w-4" />
                      <span>Actionable Weather Advisory</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      Heavy rainfall forecasted in Epe (78% probability on Thursday).
                    </p>
                    <div className="mt-3 rounded-xl bg-card p-3 text-xs leading-relaxed text-muted-foreground border border-border">
                      <strong className="text-foreground">Recommended Action:</strong> Apply cured organic poultry manure to root zones today before rain, to allow nutrients to infiltrate and avoid surface runoff.
                    </div>
                  </div>

                  {/* Produce Listing Status */}
                  <div className="rounded-2xl bg-card p-4 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-muted-foreground">Marketplace Listing</span>
                      <span className="rounded-full bg-accent/25 px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
                        Matched with Buyer
                      </span>
                    </div>
                    <p className="mt-1 font-bold text-sm">25 Baskets Fresh Ugu Harvest</p>
                    <p className="text-xs text-muted-foreground">Delivery Window: Friday 7:00 AM · Fair Market Price Locked</p>
                  </div>
                </div>
              )}

              {activePersona === "buyer" && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-soil uppercase tracking-wider">Tunde's Sourcing Feed</p>
                      <h5 className="font-display text-xl font-bold">Direct Farm Sourcing</h5>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">Verified Origin</span>
                  </div>

                  {/* Marketplace Order Match */}
                  <div className="rounded-2xl bg-secondary/70 p-4 border border-border space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Farm-Gate Availability</span>
                        <h6 className="font-bold text-base">Epe Organic Cluster · 50 Crates Tatashe</h6>
                      </div>
                      <span className="font-mono text-sm font-bold text-primary">Harvest Fri</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Grade A produce. Harvested direct from verified farmers using certified Sàsàèníyàn cured compost.
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                      <span className="font-semibold text-muted-foreground">Traceability ID: #EPE-2026-88</span>
                      <span className="text-primary font-bold">0 Middlemen Fees</span>
                    </div>
                  </div>

                  {/* Buyer Fulfilment Tracker */}
                  <div className="rounded-2xl bg-card p-4 border border-border">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span>Transparent Contract Terms</span>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      Escrow-backed commitments protect both farmer and buyer. No surprise price hikes on harvest day.
                    </p>
                  </div>
                </div>
              )}

              {activePersona === "circular" && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-soil uppercase tracking-wider">Kemi's Circular Ops</p>
                      <h5 className="font-display text-xl font-bold">Batch #SAS-COM-042</h5>
                    </div>
                    <span className="rounded-full bg-accent/30 px-2.5 py-1 text-xs font-bold text-accent-foreground">Curing: Week 4/6</span>
                  </div>

                  {/* Circular Traceability Chain */}
                  <div className="rounded-2xl bg-secondary/70 p-4 border border-border space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Circularity Handoff</span>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">1. Waste Inflow</span>
                        <span className="font-semibold">14.8 tonnes collected</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">2. Carbon-to-Nitrogen Ratio</span>
                        <span className="font-semibold text-primary">Balanced (28:1)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">3. Target Output</span>
                        <span className="font-semibold">220 x 50kg Cured Bags</span>
                      </div>
                    </div>
                  </div>

                  {/* Destination Allocation */}
                  <div className="rounded-2xl bg-card p-4 border border-border">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Allocation Queue</span>
                    <p className="mt-1 text-sm font-bold">12 Registered Smallholders in Line</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">100% of organic fertilizer batch allocated before curing completes.</p>
                  </div>
                </div>
              )}

              {activePersona === "impact" && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-soil uppercase tracking-wider">Provenance &amp; Impact</p>
                      <h5 className="font-display text-xl font-bold">Verified Network Ledger</h5>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">Audit-Ready</span>
                  </div>

                  {/* Impact Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl bg-secondary/80 p-3 border border-border">
                      <p className="font-display text-2xl font-bold text-primary">150 ha</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Farmland Protected</p>
                    </div>
                    <div className="rounded-xl bg-secondary/80 p-3 border border-border">
                      <p className="font-display text-2xl font-bold text-soil">+35%</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Farmer Net Income</p>
                    </div>
                    <div className="rounded-xl bg-secondary/80 p-3 border border-border">
                      <p className="font-display text-2xl font-bold text-primary">310 T</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Agro-Waste Diverted</p>
                    </div>
                    <div className="rounded-xl bg-secondary/80 p-3 border border-border">
                      <p className="font-display text-2xl font-bold text-soil">0</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Exploitative Middlemen</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground italic text-center">
                    All indicators distinguish verified platform transactions from statistical estimates.
                  </p>
                </div>
              )}
            </div>

            {/* Mockup Footer */}
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Low-Bandwidth Mobile Web</span>
              <span className="text-primary font-bold">Encrypted &amp; Traceable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="relative z-10 mt-14 pt-12 border-t border-forest-foreground/15">
        <h3 className="font-display text-2xl sm:text-3xl">Architected on 6 Uncompromising Principles</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "1. Useful before impressive",
              desc: "Clear actions with limitations and facts behind each recommendation — no AI black boxes.",
            },
            {
              title: "2. Accessible by default",
              desc: "Engineered for entry-level smartphones, intermittent connectivity, and local field support.",
            },
            {
              title: "3. Trust through transparency",
              desc: "Every price, forecast, and impact number shows its source and exact last-updated timestamp.",
            },
            {
              title: "4. Human-supported decisions",
              desc: "AI advises, but farmers decide. Field extension officers support disputes and verification.",
            },
            {
              title: "5. Traceable circularity",
              desc: "Full custody tracking from organic waste collection to fertilizer batch curing and field distribution.",
            },
            {
              title: "6. Fair market participation",
              desc: "Transparent fees, locked harvest terms, and verified buyers so smallholders keep the value they create.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-forest-foreground/5 p-5 border border-forest-foreground/10">
              <h4 className="font-bold text-lime text-base">{item.title}</h4>
              <p className="mt-2 text-xs sm:text-sm opacity-80 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Early Access / Waitlist Signup Call to Action */}
      <div className="relative z-10 mt-12 rounded-2xl bg-lime/10 border border-lime/30 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime/20 px-3 py-1 text-xs font-bold text-lime">
            <Users className="h-3.5 w-3.5" />
            <span>PILOT INVITATION</span>
          </div>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl text-forest-foreground">
            Be Among the First on the Pilot Network
          </h3>
          <p className="mt-2 text-sm opacity-85 leading-relaxed">
            We are onboarding our first cohort of smallholder farmers, produce buyers, and circular waste partners in Lagos &amp; Ogun.
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          {joined ? (
            <div className="rounded-2xl bg-forest-foreground/15 p-6 border border-lime text-center animate-in zoom-in-95 duration-300">
              <CheckCircle2 className="mx-auto h-10 w-10 text-lime" />
              <h4 className="mt-3 font-display text-xl font-bold">You're on the Priority List!</h4>
              <p className="mt-2 text-xs opacity-85">
                We'll notify you as soon as pilot onboarding commences in your area.
              </p>
              <div className="mt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-xs font-bold text-forest hover:brightness-105 transition"
                >
                  <span>Chat with our Agritech Lead on WhatsApp</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="space-y-3">
              <div className="flex gap-2">
                <select
                  value={waitlistRole}
                  onChange={(e) => setWaitlistRole(e.target.value)}
                  className="rounded-xl border border-forest-foreground/30 bg-forest-foreground/10 px-3 py-2.5 text-xs text-forest-foreground font-semibold outline-none focus:border-lime"
                >
                  <option value="farmer" className="bg-forest text-forest-foreground">Smallholder Farmer</option>
                  <option value="buyer" className="bg-forest text-forest-foreground">Produce Buyer / Aggregator</option>
                  <option value="circular" className="bg-forest text-forest-foreground">Waste / Fertilizer Partner</option>
                  <option value="investor" className="bg-forest text-forest-foreground">Partner / Impact Investor</option>
                </select>
                <input
                  type="text"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Email or WhatsApp number"
                  className="flex-1 rounded-xl border border-forest-foreground/30 bg-forest-foreground/10 px-3 py-2.5 text-xs text-forest-foreground placeholder:text-forest-foreground/50 outline-none focus:border-lime"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-5 py-3 text-xs font-bold text-forest transition hover:brightness-105"
                >
                  <span>Request Pilot Access</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
                <Link
                  to="/platform"
                  className="inline-flex items-center justify-center rounded-xl border border-forest-foreground/30 px-4 py-3 text-xs font-bold text-forest-foreground hover:bg-forest-foreground/10 transition"
                >
                  View Blueprint →
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
