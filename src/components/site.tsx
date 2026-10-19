import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "@/assets/logo.png";
import { PHONE, orderLink } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/platform", label: "Agritech" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function OrderButton({ item, children, variant = "lime" }: { item?: string; children?: ReactNode; variant?: "lime" | "forest" | "outline" }) {
  const styles = {
    lime: "bg-accent text-accent-foreground hover:brightness-95",
    forest: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border border-current hover:bg-foreground/5",
  }[variant];
  return (
    <a href={orderLink(item)} target="_blank" rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${styles}`}>
      {children ?? "Order on WhatsApp"}
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Sàsàèníyàn Integrated" className="h-10 w-auto object-contain" />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-foreground" }}>{n.label}</Link>
          ))}
          <a href="/#ai-recommender" className="inline-flex items-center gap-1.5 text-xs font-bold text-soil bg-accent/25 px-3 py-1.5 rounded-full hover:bg-accent/40 transition">
            ✨ AI Assistant
          </a>
          <OrderButton variant="forest">Order now</OrderButton>
        </nav>
        <button className="md:hidden rounded-full border px-4 py-2 text-sm font-semibold" onClick={() => setOpen(!open)} aria-label="Menu">Menu</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t px-5 py-4 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 font-semibold">{n.label}</Link>
          ))}
          <a href="/#ai-recommender" onClick={() => setOpen(false)} className="py-2 font-semibold text-soil flex items-center gap-2">
            ✨ AI Assistant
          </a>
          <OrderButton variant="forest">Order now</OrderButton>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Link to="/" className="inline-block mb-4 rounded-xl bg-card/95 p-2 backdrop-blur-xs shadow-xs">
            <img src={logo} alt="Sàsàèníyàn Integrated" className="h-10 w-auto object-contain" />
          </Link>
          <p className="font-display text-2xl">Sàsàèníyàn Integrated</p>
          <p className="mt-3 text-sm opacity-75">Feeding the future, sustainably. Integrated crop, livestock and organic manure farming in Lagos, Nigeria.</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-bold text-lime">Explore</p>
          <ul className="space-y-2 opacity-85">
            {nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-bold text-lime">Reach us</p>
          <p className="opacity-85">Lagos, Nigeria</p>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="block opacity-85">{PHONE}</a>
          <div className="mt-4"><OrderButton>Chat on WhatsApp</OrderButton></div>
        </div>
      </div>
      <p className="border-t border-forest-foreground/15 py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} Sàsàèníyàn Integrated Farming</p>
    </footer>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="bg-forest text-forest-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-lime">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl opacity-80">{text}</p>
      </div>
    </section>
  );
}

export function meta(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
