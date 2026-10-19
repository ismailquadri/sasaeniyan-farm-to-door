import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import manure from "@/assets/manure.jpg";
import produce from "@/assets/produce.jpg";
import poultry from "@/assets/poultry.jpg";
import { OrderButton, meta } from "@/components/site";
import { Team } from "@/components/team";
import { AiRecommender } from "@/components/ai-recommender";
import { PlatformTeaser } from "@/components/platform-teaser";
import { CompetitorValueFeatures } from "@/components/competitor-features";

export const Route = createFileRoute("/")({
  head: () => meta(
    "Sàsàèníyàn Integrated — Organic Farm Produce & Manure, Lagos",
    "Fresh Nigerian farm produce, organic manure, eggs and poultry direct from our integrated farm in Lagos. Order on WhatsApp.",
    "/",
  ),
  component: Home,
});

const pillars = [
  { t: "Farm to your door", d: "No middlemen. Fresh produce goes straight from our fields to homes, shops and restaurants." },
  { t: "Organic & regenerative", d: "Our livestock feed the soil, our soil feeds the crops. Nothing is wasted." },
  { t: "Traceable & trusted", d: "Know exactly where your food was grown and when it was harvested." },
  { t: "Farmers first", d: "We train and partner with smallholder farmers so they earn more." },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Nigerian farmers holding baskets of fresh vegetables" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-forest/10" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 text-forest-foreground md:py-36">
          <p className="text-sm font-bold uppercase tracking-widest text-lime">Integrated AgroTech · Lagos</p>
          <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl md:text-7xl leading-[1.05]">Fresh from our soil to your table.</h1>
          <p className="mt-6 max-w-lg text-lg opacity-85">Organic manure, fresh produce, eggs and poultry — grown sustainably in Nigeria and sold directly to you.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <OrderButton>Order on WhatsApp</OrderButton>
            <Link to="/products" className="inline-flex items-center rounded-full border border-forest-foreground/40 px-6 py-3 text-sm font-bold hover:bg-forest-foreground/10">Browse products</Link>
            <a href="#ai-recommender" className="inline-flex items-center gap-2 rounded-full bg-forest-foreground/15 px-6 py-3 text-sm font-bold hover:bg-forest-foreground/25 transition">
              ✨ AI Recommender
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-lg text-4xl md:text-5xl">What we grow & make</h2>
          <Link to="/products" className="font-bold underline underline-offset-4">See all products →</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { img: manure, t: "Organic Manure", d: "Cured compost and poultry manure for healthier soil." },
            { img: produce, t: "Fresh Produce", d: "Tomatoes, peppers, ugu, okra, yam and plantain." },
            { img: poultry, t: "Eggs & Poultry", d: "Free-range eggs and healthy chickens." },
          ].map((c) => (
            <Link to="/products" key={c.t} className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border">
              <img src={c.img} alt={c.t} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-6">
                <h3 className="text-2xl">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <AiRecommender />
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-2xl text-4xl md:text-5xl">Why buyers and farmers choose us</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={p.t}>
                <span className="font-display text-5xl text-soil">0{i + 1}</span>
                <h3 className="mt-3 text-xl">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest text-forest-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {[["150 ha", "Farmland secured"], ["100+", "Farmer partners"], ["3–5", "Steps from farm to buyer"], ["0", "Middlemen"]].map(([v, l]) => (
            <div key={l}><p className="font-display text-5xl text-lime">{v}</p><p className="mt-2 text-sm opacity-75">{l}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <CompetitorValueFeatures />
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
        <img src={manure} alt="Farmer holding organic compost" loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-3xl object-cover" />
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-soil">Circular farming</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Nothing wasted. Everything grows.</h2>
          <ol className="mt-8 space-y-5">
            {[
              ["Livestock", "Our poultry and animals produce natural manure."],
              ["Compost", "We cure it into rich, safe organic fertiliser."],
              ["Crops", "Healthy soil grows tastier, chemical-free vegetables."],
              ["You", "Fresh food and manure reach you directly — fast."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">{i + 1}</span>
                <div><p className="font-bold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <PlatformTeaser />
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-4xl md:text-5xl">How ordering works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Choose", "Browse our products and pick what you need."],
              ["Message", "Tap “Order” — WhatsApp opens with your order ready."],
              ["Receive", "We confirm price and deliver fresh to your door."],
            ].map(([t, d], i) => (
              <div key={t} className="rounded-2xl bg-card p-7 ring-1 ring-border">
                <p className="font-display text-4xl text-soil">Step {i + 1}</p>
                <h3 className="mt-3 text-2xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="max-w-2xl text-4xl md:text-5xl">Who we serve</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Households", "Weekly farm boxes for families and estates."],
            ["Restaurants & vendors", "Reliable bulk supply at fair prices."],
            ["Supermarkets & shops", "Consistent, traceable fresh stock."],
            ["Farmers", "Organic manure, training and buyers."],
          ].map(([t, d]) => (
            <div key={t} className="border-t-4 border-accent pt-5">
              <h3 className="text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest text-forest-foreground">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-4xl md:text-5xl">What people say</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["The tomatoes and ugu taste like my grandmother's farm. Delivery was quick too.", "Customer, Lekki"],
              ["Their compost transformed my pepper beds. Yields went up this season.", "Farmer, Epe"],
              ["We now buy eggs and vegetables directly — fresher and cheaper than the market.", "Restaurant owner, Ikeja"],
            ].map(([q, a]) => (
              <blockquote key={a} className="rounded-2xl bg-forest-foreground/5 p-7 ring-1 ring-forest-foreground/15">
                <p className="font-display text-xl">“{q}”</p>
                <footer className="mt-4 text-sm text-lime">— {a}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-4xl md:text-5xl">Meet the founders</h2>
        <Team />
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h2 className="text-4xl md:text-5xl">Questions</h2>
          <div className="mt-8 space-y-3">
            {[
              ["Do you deliver?", "Yes, across Lagos. Bulk orders can be arranged nationwide."],
              ["Is your produce organic?", "We grow with our own cured organic manure and regenerative practices, without harsh chemicals."],
              ["How do I pay?", "We confirm your order and price on WhatsApp, then share payment details."],
              ["Can farmers sell through you?", "Yes — join our farmer network on the Services page."],
            ].map(([q, a]) => (
              <details key={q} className="rounded-xl bg-card p-5 ring-1 ring-border">
                <summary className="cursor-pointer font-bold">{q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 rounded-3xl bg-accent p-10 text-accent-foreground md:grid-cols-[1.5fr_1fr] md:items-center md:p-14">
          <div>
            <h2 className="text-4xl md:text-5xl">Ready to order?</h2>
            <p className="mt-4 max-w-md">Send us a message with what you need. We reply fast and deliver across Lagos.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <OrderButton variant="forest">Order on WhatsApp</OrderButton>
            <Link to="/contact" className="inline-flex items-center rounded-full border border-current px-6 py-3 text-sm font-bold">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
