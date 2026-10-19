import { createFileRoute } from "@tanstack/react-router";
import cofounder from "@/assets/cofounder.png.asset.json";
import { PageHero, meta } from "@/components/site";
import { Team } from "@/components/team";

export const Route = createFileRoute("/about")({
  head: () => meta("About — Sàsàèníyàn Integrated", "Our mission: affordable, traceable, sustainable food for urban Nigeria through integrated farming.", "/about"),
  component: About,
});

const stats = [
  { v: "150 ha", l: "Farmland secured" },
  { v: "100+", l: "Farmer partnerships" },
  { v: "3–5", l: "Steps from farm to buyer" },
  { v: "Year-round", l: "Supply" },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Feeding the future, sustainably." text="Sàsàèníyàn Integrated combines crop farming, livestock and agro-processing into one circular system that delivers affordable, traceable food to urban Nigeria." />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-4xl">Why we exist</h2>
          <p className="mt-5 text-muted-foreground">Nigeria's population is growing faster than its food supply. Prices rise, supply chains break and smallholder farmers struggle to reach buyers.</p>
          <p className="mt-4 text-muted-foreground">Our answer is integrated farming: livestock manure feeds our soil, healthy soil grows our crops, and we sell directly to homes, shops and restaurants. Less waste, fewer middlemen, fairer prices.</p>
          <p className="mt-4 text-muted-foreground">We are proud participants of the Lagos State Ministry of Agriculture's Agripreneurship Programme.</p>
        </div>
        <figure>
          <img src={cofounder.url} alt="Adekunle Ajisafe, Founder & CEO at the Lagos Agripreneurship Programme" loading="lazy" className="w-full rounded-3xl object-cover shadow-sm" />
          <figcaption className="mt-3 text-sm text-muted-foreground">Founder &amp; CEO Adekunle Ajisafe at the Lagos State Agripreneurship Programme.</figcaption>
        </figure>
      </section>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l}><p className="font-display text-5xl text-primary">{s.v}</p><p className="mt-2 text-sm text-muted-foreground">{s.l}</p></div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-4xl">Our team</h2>
        <Team />
      </section>
    </>
  );
}
