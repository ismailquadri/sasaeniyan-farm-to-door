import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero, meta } from "@/components/site";
import { PHONE, products, deliveryZones, valueBundles } from "@/lib/site";
import {
  buildWhatsAppLink,
  draftBasketOrderMessage,
  draftGeneralInquiryMessage,
  WHATSAPP_NUMBER,
} from "@/lib/whatsapp";
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () =>
    meta(
      "Contact & Order — Sàsàèníyàn Integrated",
      "Call or WhatsApp Sàsàèníyàn Integrated in Lagos to order organic manure, fresh produce, bundles, eggs and poultry.",
      "/contact",
    ),
  component: Contact,
});

const field = "w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring";

function Contact() {
  const [f, setF] = useState({
    name: "",
    phone: "",
    orderType: "Direct Household Order",
    product: products[0]?.name ?? "",
    zone: deliveryZones[0]?.zone ?? "Lagos Island & Lekki Corridor",
    qty: "1",
    address: "",
  });

  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF({ ...f, [k]: e.target.value });

  // Generate real-time live pre-draft message
  const preDraftMessage = draftBasketOrderMessage({
    items: [
      {
        name: f.product,
        qty: parseInt(f.qty) || 1,
        unit: "Order Units",
      },
    ],
    zone: f.zone,
    deliveryAddress: f.address,
    customerName: f.name.trim() || undefined,
    customerPhone: f.phone.trim() || undefined,
    specialInstructions: `Inquiry Category: ${f.orderType}`,
  });

  const whatsappDirectUrl = buildWhatsAppLink(preDraftMessage);

  function submit(e: FormEvent) {
    e.preventDefault();
    window.open(whatsappDirectUrl, "_blank");
  }

  function handleCopy() {
    navigator.clipboard?.writeText(preDraftMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const generalInquiryLink = buildWhatsAppLink(
    draftGeneralInquiryMessage({
      topic: "Farm-Gate Ordering, Delivery & Farm Visit",
      customerName: f.name.trim() || undefined,
    }),
  );

  return (
    <>
      <PageHero
        eyebrow="Contact &amp; Custom Orders"
        title="Direct from our farm to your kitchen or field."
        text="Fill out your order details and WhatsApp will open ready to send. Or chat with our sales team directly."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1fr_1.3fr]">
        {/* Contact Info & Hours */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-soil">Direct Hotline / WhatsApp</span>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="mt-1 block font-display text-3xl hover:text-primary transition">
              {PHONE}
            </a>
            <div className="mt-3 flex gap-2">
              <a
                href={generalInquiryLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold text-accent-foreground hover:brightness-95 transition"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold hover:bg-secondary transition"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Farm Sales</span>
              </a>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-soil">Farm &amp; Dispatch Hubs</span>
            <p className="mt-1 font-display text-2xl font-bold">Lagos &amp; Epe, Nigeria</p>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Integrated circular farm operations in Epe, with cold storage and same-day express dispatch across Lagos metropolis.
            </p>
          </div>

          <div className="rounded-2xl bg-secondary/80 p-5 border border-border space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              <span>Dispatch &amp; Support Hours</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li>• Monday – Saturday: 7:00 AM – 7:00 PM</li>
              <li>• Sunday: Farm gate collections &amp; pre-orders</li>
              <li>• Same-day delivery for morning orders placed before 10:00 AM</li>
            </ul>
          </div>
        </div>

        {/* Order & Inquiry Form */}
        <form onSubmit={submit} className="space-y-4 rounded-3xl bg-secondary p-6 sm:p-8 border border-border shadow-xs">
          <h3 className="font-display text-2xl font-bold">Fast Order &amp; Delivery Inquiry</h3>
          <p className="text-xs text-muted-foreground">
            Takes 30 seconds. Opens WhatsApp directly with your pre-formatted order details.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold text-muted-foreground block mb-1">Your Full Name</label>
              <input required placeholder="e.g. Tunde Balogun" className={field} value={f.name} onChange={set("name")} />
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted-foreground block mb-1">Phone / WhatsApp Number</label>
              <input required placeholder="e.g. 0801 234 5678" className={field} value={f.phone} onChange={set("phone")} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold text-muted-foreground block mb-1">Order Purpose</label>
              <select className={field} value={f.orderType} onChange={set("orderType")}>
                <option value="Direct Home Order">Direct Household Order</option>
                <option value="Pally / Group Split">"Pally" Group Split (Neighbours/Office)</option>
                <option value="B2B Commercial Supply">B2B Restaurant / Supermarket Supply</option>
                <option value="Farmer Offtake / Manure">Farm Bulk Manure / Outgrower Network</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-muted-foreground block mb-1">Select Product or Bundle</label>
              <select className={field} value={f.product} onChange={set("product")}>
                <optgroup label="Standard Farm Products">
                  {products.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name} ({p.unit})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Curated Value Bundles">
                  {valueBundles.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name} ({b.servingsOrSize})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold text-muted-foreground block mb-1">Quantity Needed</label>
              <input
                required
                placeholder="e.g. 2 bags, 3 crates, 1 feast pack"
                className={field}
                value={f.qty}
                onChange={set("qty")}
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-muted-foreground block mb-1">Lagos Delivery Zone</label>
              <select className={field} value={f.zone} onChange={set("zone")}>
                {deliveryZones.map((z) => (
                  <option key={z.zone} value={z.zone}>
                    {z.zone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-muted-foreground block mb-1">Delivery Address or Landmark</label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Lekki Phase 1, off Admiralty Way, near..."
              className={field}
              value={f.address}
              onChange={set("address")}
            />
          </div>

          {/* Live Pre-Draft Message Preview */}
          <div className="rounded-2xl border border-primary/20 bg-secondary/40 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Live WhatsApp Pre-Draft Preview
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-card transition"
              >
                {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied!" : "Copy text"}</span>
              </button>
            </div>
            <pre className="text-[11px] leading-relaxed text-muted-foreground bg-card/80 p-3 rounded-xl border border-border whitespace-pre-wrap font-sans max-h-40 overflow-y-auto">
              {preDraftMessage}
            </pre>
            <p className="text-[10px] text-muted-foreground">
              Connected to official line: <strong className="text-foreground">+{WHATSAPP_NUMBER}</strong> ({PHONE}). Clicking below automatically opens this drafted message in your WhatsApp app or web.
            </p>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition shadow-sm"
          >
            <span>Send Pre-Drafted Order via WhatsApp</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </section>
    </>
  );
}
