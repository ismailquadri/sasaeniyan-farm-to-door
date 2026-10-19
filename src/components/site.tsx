import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "@/assets/logo.png";
import { PHONE, ADDRESS, orderLink } from "@/lib/site";
import { useBasket } from "@/lib/basket-store";
import {
  Menu,
  X,
  Phone,
  MessageSquare,
  ShoppingBasket,
  Sparkles,
  Home,
  Package,
  MapPin,
  ChevronRight,
  Layers,
  Info,
} from "lucide-react";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Products", icon: Package },
  { to: "/services", label: "Services", icon: Layers },
  { to: "/platform", label: "Agritech", icon: Sparkles },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: MessageSquare },
] as const;

export function OrderButton({ item, children, variant = "lime" }: { item?: string; children?: ReactNode; variant?: "lime" | "forest" | "outline" }) {
  const styles = {
    lime: "bg-accent text-accent-foreground hover:brightness-95",
    forest: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border border-current hover:bg-foreground/5",
  }[variant];
  return (
    <a href={orderLink(item)} target="_blank" rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition active:scale-95 ${styles}`}>
      {children ?? "Order on WhatsApp"}
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, openBasket } = useBasket();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Sàsàèníyàn Integrated" className="h-8 sm:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-foreground font-bold" }}>{n.label}</Link>
          ))}
          <a href="/#ai-recommender" className="inline-flex items-center gap-1.5 text-xs font-bold text-soil bg-accent/25 px-3 py-1.5 rounded-full hover:bg-accent/40 transition">
            ✨ AI Assistant
          </a>
          <OrderButton variant="forest">Order now</OrderButton>
        </nav>

        {/* Mobile Header Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            aria-label="Call Farm Sales"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-secondary active:scale-95 transition"
          >
            <Phone className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={openBasket}
            aria-label="Farm Basket"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-secondary active:scale-95 transition"
          >
            <ShoppingBasket className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-extrabold text-primary-foreground animate-in zoom-in-75">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-secondary active:scale-95 transition"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {open && (
        <div className="border-t bg-card/98 backdrop-blur-xl px-4 py-5 md:hidden shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col divide-y divide-border/60">
            {nav.map((n) => {
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 text-sm font-semibold text-foreground/90 hover:text-primary transition active:bg-secondary/40 px-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-soil" />
                    <span>{n.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 space-y-3 pt-3 border-t border-border">
            <a
              href="/#ai-recommender"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-accent/20 p-3.5 text-xs font-bold text-accent-foreground border border-accent/40 active:scale-95 transition"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-soil" />
                <span>AI Meal &amp; Farm Recommender</span>
              </div>
              <ChevronRight className="h-4 w-4 text-soil" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={orderLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-3 text-xs font-bold text-accent-foreground shadow-xs active:scale-95 transition"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-4 py-3 text-xs font-bold text-foreground active:scale-95 transition"
              >
                <Phone className="h-4 w-4" />
                <span>Call Farm</span>
              </a>
            </div>

            <div className="rounded-xl bg-secondary/80 p-3 border border-border text-[11px] text-muted-foreground space-y-1">
              <div className="flex items-start gap-1.5 text-foreground font-semibold">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                <span>{ADDRESS}</span>
              </div>
              <p className="pl-5 text-[10px]">Same-day express delivery across Lagos metropolis.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function MobileBottomBar() {
  const { count, openBasket } = useBasket();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav
      aria-label="Mobile quick actions"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 md:hidden shadow-2xl"
    >
      <div className="grid grid-cols-5 items-center justify-around px-1 text-center">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold transition active:scale-95 ${
            currentPath === "/" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="h-5 w-5 mb-0.5" />
          <span>Home</span>
        </Link>

        <Link
          to="/products"
          className={`flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold transition active:scale-95 ${
            currentPath.startsWith("/products") ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Package className="h-5 w-5 mb-0.5" />
          <span>Products</span>
        </Link>

        <a
          href="/#ai-recommender"
          className="flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold text-soil hover:text-soil/80 transition active:scale-95"
        >
          <span className="relative flex h-5 w-5 items-center justify-center mb-0.5">
            <Sparkles className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
          </span>
          <span>AI Assist</span>
        </a>

        <button
          type="button"
          onClick={openBasket}
          className="flex flex-col items-center justify-center py-1.5 text-[10px] font-semibold text-muted-foreground hover:text-foreground transition active:scale-95"
          aria-label="Open Farm Basket"
        >
          <span className="relative flex h-5 w-5 items-center justify-center mb-0.5">
            <ShoppingBasket className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-extrabold text-primary-foreground animate-in zoom-in-75">
                {count}
              </span>
            )}
          </span>
          <span>Basket</span>
        </button>

        <a
          href={orderLink()}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 text-[10px] font-bold text-accent-foreground transition active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <span className="flex h-5 w-5 items-center justify-center mb-0.5 rounded-full bg-accent text-accent-foreground shadow-xs">
            <MessageSquare className="h-3 w-3" />
          </span>
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
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
          <p className="opacity-85 leading-relaxed">{ADDRESS}</p>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="block mt-2 opacity-85 hover:opacity-100 transition">{PHONE}</a>
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
