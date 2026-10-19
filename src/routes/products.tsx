import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OrderButton, PageHero, meta } from "@/components/site";
import { products, valueBundles } from "@/lib/site";
import {
  buildWhatsAppLink,
  draftProductOrderMessage,
  draftGeneralInquiryMessage,
} from "@/lib/whatsapp";
import { AiRecommender } from "@/components/ai-recommender";
import { useBasket } from "@/lib/basket-store";
import { CheckCircle2, ArrowRight, ShieldCheck, ShoppingBag, Sparkles, ShoppingBasket, Plus } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () =>
    meta(
      "Products & Value Bundles — Sàsàèníyàn Integrated",
      "Organic manure, fresh vegetables, yam, plantain, eggs, chicken, meal kits and farm box subscriptions from our Lagos farm.",
      "/products",
    ),
  component: Products,
});

const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

function Products() {
  const { addItem } = useBasket();
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Our products"
        title="Grown right. Sold direct."
        text="Pick what you need and order instantly on WhatsApp. Save up to 35% compared to open markets with 100% organic traceability."
      />

      {/* Product Catalog Grid */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold ring-1 ring-border transition active:scale-95 ${
                  cat === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <span className="text-xs font-semibold text-muted-foreground shrink-0">
            Showing {list.length} direct-from-farm items
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-xs hover:shadow-md transition duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 rounded-full bg-forest/90 px-3 py-1 text-xs font-bold text-lime backdrop-blur-xs">
                    {p.badge}
                  </span>
                )}
                {p.approxMarketPrice && (
                  <span className="absolute bottom-3 right-3 rounded-md bg-card/90 px-2.5 py-1 text-[11px] font-bold text-soil shadow-xs">
                    vs Market {p.approxMarketPrice}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-soil">{p.category}</p>
                  <span className="text-xs font-semibold text-muted-foreground">{p.unit}</span>
                </div>
                <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>

                {p.approxFarmPrice && (
                  <div className="mt-4 pt-3 border-t border-border flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-muted-foreground uppercase font-bold block">Farm-Gate Price</span>
                      <span className="font-display text-xl font-bold text-primary">{p.approxFarmPrice}</span>
                    </div>
                    {p.approxMarketPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {p.approxMarketPrice}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => addItem({ name: p.name, unit: p.unit, image: p.image, price: p.approxFarmPrice, category: p.category })}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-2.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground active:scale-95 transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>+ Basket</span>
                  </button>
                  <OrderButton item={`${p.name} (${p.unit})`}>Order</OrderButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Curated Value Bundles Section */}
      <section className="bg-secondary/60 py-20 border-y border-border">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1 text-xs font-bold text-accent-foreground">
              <ShoppingBag className="h-3.5 w-3.5 text-soil" />
              <span>MOST POPULAR COMBINATIONS</span>
            </div>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
              Curated Value Bundles &amp; Meal Kits
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Order complete meal packs and soil fertility sets bundled directly from the farm at wholesale discounts.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {valueBundles.map((b) => (
              <div
                key={b.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-xs"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img src={b.image} alt={b.name} loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute bottom-2 left-2 rounded-md bg-forest/90 px-2.5 py-1 text-xs font-bold text-lime backdrop-blur-xs">
                      {b.savingsBadge}
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-soil">{b.tagline}</span>
                    <h4 className="mt-1 font-display text-2xl font-bold">{b.name}</h4>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{b.desc}</p>

                    <div className="mt-4 rounded-xl bg-secondary/80 p-3.5 border border-border">
                      <span className="text-[11px] font-bold text-foreground block mb-2">Bundle Contents:</span>
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
                    <span>Serving:</span>
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
      </section>

      {/* Freshness Guarantee Banner */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-2xl bg-forest text-forest-foreground p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime/20 text-lime font-display text-2xl">
              ✓
            </div>
            <div>
              <h4 className="font-display text-xl font-bold">100% Farm-Gate Freshness Guarantee</h4>
              <p className="mt-1 text-xs opacity-80 max-w-xl">
                Harvested within 24–48 hours of dispatch. Any bruised or spoiled produce is replaced immediately or credited back via WhatsApp.
              </p>
            </div>
          </div>
          <a
            href={buildWhatsAppLink(
              draftGeneralInquiryMessage({
                topic: "100% Farm-Gate Freshness Guarantee & Replacement Policy",
              }),
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 text-xs font-bold text-forest hover:brightness-105 transition"
          >
            <span>Ask a Question</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* AI Recommender Component */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <AiRecommender />
      </section>
    </>
  );
}
