import { useState, useTransition, type FormEvent } from "react";
import { Sparkles, Utensils, Sprout, Send, ArrowRight, Lightbulb, RotateCcw, ShoppingBasket, Plus } from "lucide-react";
import {
  getProductRecommendations,
  buildWhatsAppOrderMessage,
  type RecommendationResult,
} from "@/lib/ai-recommender";
import { OrderButton } from "@/components/site";
import { useBasket } from "@/lib/basket-store";

const PRESET_PROMPTS = [
  {
    category: "meal",
    icon: Utensils,
    label: "Sunday Stew & Chicken",
    prompt: "I'm cooking Nigerian tomato stew and fried chicken for 8 people this Sunday",
  },
  {
    category: "meal",
    icon: Utensils,
    label: "Pounded Yam & Efo Riro",
    prompt: "I want to make smooth pounded yam with fresh efo riro soup and pepper",
  },
  {
    category: "meal",
    icon: Utensils,
    label: "Healthy Family Breakfast",
    prompt: "High-protein wholesome breakfast with fresh eggs and fried plantains",
  },
  {
    category: "farm",
    icon: Sprout,
    label: "Vegetable Soil Conditioning",
    prompt: "I have vegetable beds in Lagos and need organic manure to restore depleted soil",
  },
  {
    category: "farm",
    icon: Sprout,
    label: "High-Nitrogen for Maize",
    prompt: "Need cured organic fertilizer high in nitrogen for two plots of maize and fluted pumpkin",
  },
  {
    category: "meal",
    icon: Utensils,
    label: "Weekly Household Farm Box",
    prompt: "Need a regular weekly box of fresh vegetables and eggs delivered to my home in Lagos",
  },
];

export function AiRecommender({ defaultCategory = "all" }: { defaultCategory?: "all" | "meal" | "farm" }) {
  const { addItem } = useBasket();
  const [activeTab, setActiveTab] = useState<"all" | "meal" | "farm">(defaultCategory);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function addAllToBasket() {
    if (!result) return;
    result.recommended.forEach(({ product }) => {
      addItem({
        name: product.name,
        unit: product.unit,
        image: product.image,
        category: product.category,
      });
    });
  }

  const filteredPresets =
    activeTab === "all"
      ? PRESET_PROMPTS
      : PRESET_PROMPTS.filter((p) => p.category === activeTab);

  function handleSubmit(promptText?: string) {
    const textToSearch = (promptText ?? query).trim();
    if (!textToSearch) {
      setError("Please describe what you are cooking or what your farm needs.");
      return;
    }

    setError(null);
    if (promptText) {
      setQuery(promptText);
    }

    startTransition(async () => {
      try {
        const res = await getProductRecommendations(textToSearch, activeTab);
        setResult(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to get recommendations right now.");
      }
    });
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    handleSubmit();
  }

  function reset() {
    setResult(null);
    setQuery("");
    setError(null);
  }

  return (
    <div id="ai-recommender" className="relative overflow-hidden rounded-3xl bg-card p-6 ring-1 ring-border shadow-md md:p-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1.5 text-xs font-bold text-accent-foreground">
            <Sparkles className="h-4 w-4 text-soil" />
            <span>AI Product Recommender</span>
          </div>

          {result && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Ask something else</span>
            </button>
          )}
        </div>

        <h3 className="mt-4 font-display text-3xl md:text-4xl">
          Describe what you need for your meal or farm
        </h3>
        <p className="mt-2 max-w-2xl text-sm md:text-base text-muted-foreground">
          Tell us what dish you are preparing or what crops and soil you are tending. Our model uses AI Gateway to recommend the exact Sàsàèníyàn products for you.
        </p>

        {/* Category switcher */}
        {/* Category switcher */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition active:scale-95 ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            All Needs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("meal")}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition active:scale-95 ${
              activeTab === "meal"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            <Utensils className="h-3.5 w-3.5" />
            Meals &amp; Cooking
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("farm")}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition active:scale-95 ${
              activeTab === "farm"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            <Sprout className="h-3.5 w-3.5" />
            Farming &amp; Soil
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleFormSubmit} className="mt-6">
          <div className="relative flex flex-col gap-2.5 rounded-2xl border bg-background p-2.5 focus-within:ring-2 focus-within:ring-ring sm:flex-row sm:items-center">
            <textarea
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                activeTab === "farm"
                  ? "e.g., I'm planting 2 plots of pepper and need organic manure that builds long-term soil health..."
                  : activeTab === "meal"
                    ? "e.g., Cooking ofada rice and stew for a family Sunday gathering of 6 people..."
                    : "e.g., Need ingredients for egusi soup and yam, or organic compost for my garden..."
              }
              className="flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/70 min-h-[52px]"
            />
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-95 active:scale-95 disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  <span>Recommending...</span>
                </>
              ) : (
                <>
                  <span>Recommend</span>
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {error && <p className="mt-3 text-sm font-medium text-destructive">{error}</p>}

        {/* Presets */}
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Or try an example:
          </p>
          <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
            {filteredPresets.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleSubmit(preset.prompt)}
                  disabled={isPending}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3.5 py-1.5 text-xs text-muted-foreground transition hover:border-foreground/30 hover:bg-accent/15 hover:text-foreground active:scale-95 disabled:opacity-50"
                >
                  <Icon className="h-3 w-3 text-soil" />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Container */}
        {result && (
          <div className="mt-10 rounded-2xl border bg-secondary/40 p-6 md:p-8 animate-in fade-in-50 duration-500">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-soil">
                  {result.category === "farm" ? "Farm & Soil Solution" : "Culinary & Meal Solution"}
                </span>
                <h4 className="mt-1 font-display text-2xl text-foreground">{result.headline}</h4>
              </div>
              <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-accent-foreground">
                {result.source === "ai-gateway" ? "AI Gateway Model" : "Smart Recommender"}
              </span>
            </div>

            {/* Advice paragraph */}
            <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground/90">
              {result.advice}
            </p>

            {/* Practical tip */}
            {result.tip && (
              <div className="mt-4 flex items-start gap-3 rounded-xl bg-accent/20 p-4 text-sm text-accent-foreground">
                <Lightbulb className="h-5 w-5 shrink-0 text-soil mt-0.5" />
                <div>
                  <strong className="font-semibold">Pro Tip: </strong>
                  <span>{result.tip}</span>
                </div>
              </div>
            )}

            {/* Products grid */}
            <div className="mt-6">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Matching Sàsàèníyàn Products ({result.recommended.length})
              </h5>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {result.recommended.map(({ product, reason }) => (
                  <div
                    key={product.name}
                    className="flex flex-col justify-between overflow-hidden rounded-xl bg-card p-4 ring-1 ring-border shadow-xs"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        />
                        <span className="absolute bottom-2 left-2 rounded-md bg-forest/90 px-2 py-0.5 text-[11px] font-bold text-forest-foreground backdrop-blur-xs">
                          {product.unit}
                        </span>
                      </div>
                      <p className="mt-3 text-xs font-bold uppercase tracking-wider text-soil">
                        {product.category}
                      </p>
                      <h6 className="mt-1 font-display text-lg font-bold">{product.name}</h6>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{reason}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            name: product.name,
                            unit: product.unit,
                            image: product.image,
                            category: product.category,
                          })
                        }
                        className="inline-flex items-center justify-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground active:scale-95 transition"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add</span>
                      </button>
                      <OrderButton item={`${product.name} (${product.unit})`}>
                        Order
                      </OrderButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-forest p-6 text-forest-foreground">
              <div>
                <p className="font-display text-xl">Ready with your tailored bundle?</p>
                <p className="mt-1 text-xs md:text-sm opacity-80">
                  Add all recommended items to your Farm Basket or order directly on WhatsApp.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={addAllToBasket}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-forest-foreground/30 bg-forest-foreground/15 px-5 py-3 text-xs sm:text-sm font-bold text-forest-foreground hover:bg-forest-foreground/25 transition"
                >
                  <ShoppingBasket className="h-4 w-4" />
                  <span>Add All to Basket</span>
                </button>
                <a
                  href={buildWhatsAppOrderMessage(result.query, result.recommended)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition hover:brightness-95"
                >
                  <span>Order All on WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
