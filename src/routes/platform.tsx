import { createFileRoute } from "@tanstack/react-router";
import { PageHero, meta, OrderButton } from "@/components/site";
import { PlatformTeaser } from "@/components/platform-teaser";
import {
  Smartphone,
  Sprout,
  ShoppingBag,
  Recycle,
  CheckCircle2,
  Users2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/platform")({
  head: () =>
    meta(
      "Sàsàèníyàn Agritech — Digital Operating System for Circular Agriculture",
      "Coming soon: A low-bandwidth mobile platform connecting smallholder farmers, food buyers, and organic waste-to-fertilizer operations.",
      "/platform",
    ),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform Blueprint · In Our Pipeline"
        title="The Digital Operating System for Circular Agriculture."
        text="Empowering smallholder farmers with actionable low-bandwidth advisories, direct farm-to-market trade, and verifiable waste-to-fertilizer loops across Nigeria."
      />

      <section className="mx-auto max-w-6xl px-5 py-12 md:py-20">
        <PlatformTeaser />
      </section>

      {/* Blueprint Deep Dive */}
      <section className="bg-secondary/60 py-20 border-y border-border">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-soil">Architecture &amp; Strategy</p>
            <h3 className="mt-2 text-3xl sm:text-5xl font-display">
              Closing the Loop in African Agriculture
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Software alone cannot solve structural farm challenges like logistics, capital, or trust. Sàsàèníyàn Agritech combines digital tools with real, on-the-ground operating infrastructure.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-card p-6 ring-1 ring-border shadow-xs">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Sprout className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-bold">1. Farm Logs &amp; Advisory</h4>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Lightweight crop timelines and weather-triggered advisories that tell farmers the exact next best action with plain-language reasoning.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 ring-1 ring-border shadow-xs">
              <div className="h-10 w-10 rounded-xl bg-accent/25 flex items-center justify-center text-accent-foreground mb-4">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-bold">2. Direct Marketplace</h4>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Publish harvest windows directly to verified restaurants, supermarkets, and aggregators. Transparent terms and locked harvest pricing.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 ring-1 ring-border shadow-xs">
              <div className="h-10 w-10 rounded-xl bg-soil/20 flex items-center justify-center text-soil mb-4">
                <Recycle className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-bold">3. Waste-to-Fertilizer</h4>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Track organic animal and crop waste collection through batch curing to farmer distribution. Verified organic input traceability.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-6 ring-1 ring-border shadow-xs">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-bold">4. Provenance &amp; Impact</h4>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Audit-grade outcomes tracking: smallholder net income lift, regenerative hectares, and waste diversion for partners and investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Personas Section */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-soil">Human-Centered Design</p>
          <h3 className="mt-2 text-3xl sm:text-4xl font-display">Who Sàsàèníyàn Agritech Serves</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Built for everyday field realities: shared phones, intermittent 3G/4G connectivity, and human extension support.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-card p-7 ring-1 ring-border">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">Smallholder Farmer</span>
            <h4 className="mt-4 font-display text-2xl font-bold">Aderonke</h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Manages multiple small plots. Relies on low-bandwidth alerts to know when to apply inputs, when to irrigate, and when buyers are ready to purchase her harvest.
            </p>
            <div className="mt-6 pt-4 border-t border-border text-xs font-semibold text-primary">
              ✓ Low-data usage · Plain Yoruba &amp; English support
            </div>
          </div>

          <div className="rounded-2xl bg-card p-7 ring-1 ring-border">
            <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-bold text-accent-foreground">Produce Buyer</span>
            <h4 className="mt-4 font-display text-2xl font-bold">Tunde</h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Sources vegetables and poultry for supermarkets and food businesses. Needs dependable harvest quantities, verified organic quality, and direct contacts without middleman delays.
            </p>
            <div className="mt-6 pt-4 border-t border-border text-xs font-semibold text-accent-foreground">
              ✓ Direct contracts · Guaranteed traceability
            </div>
          </div>

          <div className="rounded-2xl bg-card p-7 ring-1 ring-border">
            <span className="rounded-full bg-soil/20 px-3 py-1 text-xs font-bold text-soil">Circularity Lead</span>
            <h4 className="mt-4 font-display text-2xl font-bold">Kemi</h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Coordinates waste intake from livestock farms, monitors curing temperatures, logs batch IDs, and queues fertilizer distributions so nothing is lost.
            </p>
            <div className="mt-6 pt-4 border-t border-border text-xs font-semibold text-soil">
              ✓ Batch QR codes · Inventory reconciliation
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Deployment Roadmap */}
      <section className="bg-forest text-forest-foreground py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-lime">Execution Plan</p>
            <h3 className="mt-2 text-3xl sm:text-5xl font-display">Phased Rollout Pipeline</h3>
            <p className="mt-4 opacity-80 leading-relaxed">
              We prove the operational loop in a focused geography before expanding platform scope.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-forest-foreground/5 p-6 border border-forest-foreground/15">
              <span className="text-lime font-display text-3xl font-bold">Phase 1</span>
              <h4 className="mt-2 font-display text-xl font-bold">Lagos &amp; Southwest Pilot Loop</h4>
              <p className="mt-3 text-xs sm:text-sm opacity-80 leading-relaxed">
                Onboard 100+ smallholders and 20 buyers in Epe and Ikorodu. Register crops, pilot circular manure batching, and test basic weather-informed advisories.
              </p>
              <span className="mt-4 inline-block text-[11px] font-bold text-lime uppercase tracking-wider">Current Focus</span>
            </div>

            <div className="rounded-2xl bg-forest-foreground/5 p-6 border border-forest-foreground/15">
              <span className="text-lime font-display text-3xl font-bold">Phase 2</span>
              <h4 className="mt-2 font-display text-xl font-bold">Marketplace Matching &amp; Logistics</h4>
              <p className="mt-3 text-xs sm:text-sm opacity-80 leading-relaxed">
                Automated order matching, low-bandwidth SMS/WhatsApp fallback notifications, and micro-fulfillment coordination for high-demand fresh produce.
              </p>
              <span className="mt-4 inline-block text-[11px] font-bold opacity-60 uppercase tracking-wider">Upcoming</span>
            </div>

            <div className="rounded-2xl bg-forest-foreground/5 p-6 border border-forest-foreground/15">
              <span className="text-lime font-display text-3xl font-bold">Phase 3</span>
              <h4 className="mt-2 font-display text-xl font-bold">Scale &amp; Impact Provenance</h4>
              <p className="mt-3 text-xs sm:text-sm opacity-80 leading-relaxed">
                Regional expansion across Nigeria, partner API access, verified organic carbon credits, and advanced soil microbiome tracking.
              </p>
              <span className="mt-4 inline-block text-[11px] font-bold opacity-60 uppercase tracking-wider">Later Stage</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-3xl bg-accent p-10 text-accent-foreground md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl">Partner with Us on the Agritech Pilot</h3>
            <p className="mt-3 max-w-xl text-sm sm:text-base opacity-90">
              Whether you are an agricultural extension organization, commercial buyer, waste partner, or impact investor, let's shape circular farming together.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <OrderButton item="Sàsàèníyàn Agritech Digital Platform Pilot" variant="forest">
              Join Pilot via WhatsApp
            </OrderButton>
            <a
              href="mailto:contact@sasaeniyan.com"
              className="inline-flex items-center rounded-full border border-current px-6 py-3 text-sm font-bold hover:bg-black/5 transition"
            >
              Email Platform Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
