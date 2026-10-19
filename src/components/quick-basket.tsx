import { useState } from "react";
import {
  ShoppingBasket,
  X,
  Plus,
  Minus,
  ArrowRight,
  MapPin,
  Users,
  Check,
  Percent,
  Trash2,
} from "lucide-react";
import { products, deliveryZones, buildMultiItemOrderLink } from "@/lib/site";
import { useBasket } from "@/lib/basket-store";

export function QuickBasketDrawer() {
  const {
    items,
    isOpen,
    count,
    openBasket,
    closeBasket,
    addItem,
    decrementItem,
    removeItem,
    clearBasket,
  } = useBasket();

  const [selectedZone, setSelectedZone] = useState(deliveryZones[0]?.zone ?? "Lagos");
  const [isPally, setIsPally] = useState(false);
  const [pallyCount, setPallyCount] = useState(2);
  const [customerName, setCustomerName] = useState("");

  const selectedItemsForOrder = items.map((i) => ({
    name: i.name,
    qty: i.qty,
    unit: i.unit,
  }));

  const orderUrl = buildMultiItemOrderLink({
    items: selectedItemsForOrder,
    zone: selectedZone,
    isPallySplit: isPally,
    splitCount: pallyCount,
    customerName: customerName.trim(),
  });

  return (
    <>
      {/* Floating Action Pill */}
      <aside aria-label="Quick order basket" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={openBasket}
          className="flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-2xl ring-2 ring-forest-foreground/20 hover:scale-105 transition active:scale-95"
        >
          <ShoppingBasket className="h-5 w-5" />
          <span>Farm Basket</span>
          {count > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-accent-foreground">
              {count}
            </span>
          )}
        </button>
      </aside>

      {/* Slide-over Drawer / Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs animate-in fade-in-50 duration-200">
          <div className="h-full w-full max-w-md bg-background shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b px-6 py-4 bg-card">
              <div className="flex items-center gap-2">
                <ShoppingBasket className="h-5 w-5 text-soil" />
                <h3 className="font-display text-xl font-bold">Your Multi-Item Basket</h3>
              </div>
              <button
                onClick={closeBasket}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Delivery Zone Selector */}
              <div className="rounded-2xl bg-secondary/80 p-4 border border-border space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-soil">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Delivery Destination</span>
                </div>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full rounded-xl border bg-card px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-ring"
                >
                  {deliveryZones.map((z) => (
                    <option key={z.zone} value={z.zone}>
                      {z.zone} ({z.schedule})
                    </option>
                  ))}
                </select>
              </div>

              {/* Pally Group-Buying Option */}
              <div className="rounded-2xl bg-forest text-forest-foreground p-4 border border-forest-foreground/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-lime" />
                    <span className="text-xs font-bold text-lime uppercase tracking-wide">
                      "Pally" Group Buying
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPally}
                    onChange={(e) => setIsPally(e.target.checked)}
                    className="h-4 w-4 rounded accent-lime cursor-pointer"
                  />
                </div>
                <p className="mt-1 text-[11px] opacity-80 leading-relaxed">
                  Split this bulk order with estate neighbours or friends to share delivery &amp; wholesale rates.
                </p>
                {isPally && (
                  <div className="mt-3 pt-3 border-t border-forest-foreground/15 flex items-center justify-between">
                    <span className="text-xs font-semibold">Splitting across:</span>
                    <div className="flex items-center gap-2">
                      {[2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPallyCount(num)}
                          className={`h-7 w-7 rounded-lg text-xs font-bold transition ${
                            pallyCount === num
                              ? "bg-lime text-forest"
                              : "bg-forest-foreground/20 text-forest-foreground hover:bg-forest-foreground/30"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                      <span className="text-[11px] opacity-75">people</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Items List */}
              {items.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Selected Items ({count})
                    </h4>
                    <button
                      onClick={clearBasket}
                      className="text-xs text-destructive hover:underline font-semibold"
                    >
                      Clear basket
                    </button>
                  </div>

                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-xl bg-card border border-primary/30 p-3 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-11 w-11 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-foreground">{item.name}</p>
                            <span className="text-[11px] text-muted-foreground font-medium">
                              {item.unit}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementItem(item.name)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-muted transition"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold text-xs">{item.qty}</span>
                          <button
                            onClick={() => addItem({ name: item.name, unit: item.unit, image: item.image })}
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => removeItem(item.name)}
                            className="ml-1 text-muted-foreground hover:text-destructive p-1 transition"
                            title="Remove"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Catalog Quick Add List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Browse Full Catalog
                </h4>
                <div className="space-y-2">
                  {products.map((p) => {
                    const currentInBasket = items.find((i) => i.name === p.name);
                    return (
                      <div
                        key={p.name}
                        className="flex items-center justify-between rounded-xl bg-card/60 p-2.5 border border-border hover:bg-card transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-9 w-9 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-semibold text-xs text-foreground">{p.name}</p>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {p.unit} · {p.approxFarmPrice}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => addItem({ name: p.name, unit: p.unit, image: p.image, price: p.approxFarmPrice })}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                            currentInBasket
                              ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground"
                              : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                          }`}
                        >
                          {currentInBasket ? `+ Add more (${currentInBasket.qty})` : "+ Add"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Optional Name */}
              <div>
                <label className="text-xs font-bold text-muted-foreground block mb-1">
                  Your Name / Estate (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mrs. Adeyemi (Lekki Phase 1)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border bg-card px-3.5 py-2 text-xs outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div className="border-t p-6 bg-card space-y-3">
              {items.length === 0 ? (
                <p className="text-xs text-center text-muted-foreground">
                  Your basket is empty. Tap <strong className="text-foreground">+ Add</strong> on any item above to get started.
                </p>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Total Units:</span>
                    <span className="font-bold text-foreground">
                      {count} {count === 1 ? "unit" : "units"}
                    </span>
                  </div>

                  <a
                    href={orderUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground hover:brightness-95 transition shadow-md"
                  >
                    <span>Send Order to WhatsApp</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <p className="text-[11px] text-center text-muted-foreground">
                    Opens WhatsApp with your full consolidated order. We confirm today's prices and delivery time.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
