import { CATEGORY_LABELS, type Category, type Product } from "../data/products";
import { useReveal } from "../hooks/useReveal";
import ProductCard from "./ProductCard";
import { BeanIcon, SearchIcon, XIcon } from "./icons";

export type SortKey = "featured" | "price-asc" | "price-desc" | "roast-asc" | "roast-desc";

interface ShopProps {
  items: Product[];
  total: number;
  search: string;
  onSearch: (v: string) => void;
  category: Category | "all";
  onCategory: (v: Category | "all") => void;
  sort: SortKey;
  onSort: (v: SortKey) => void;
  onOpen: (p: Product) => void;
  onAdd: (p: Product) => void;
  onReset: () => void;
}

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price · low to high" },
  { key: "price-desc", label: "Price · high to low" },
  { key: "roast-asc", label: "Roast · light first" },
  { key: "roast-desc", label: "Roast · dark first" },
];

export default function Shop({
  items,
  total,
  search,
  onSearch,
  category,
  onCategory,
  sort,
  onSort,
  onOpen,
  onAdd,
  onReset,
}: ShopProps) {
  const headRef = useReveal<HTMLDivElement>();
  const barRef = useReveal<HTMLDivElement>();

  const categories: (Category | "all")[] = [
    "all",
    "single-origin",
    "blend",
    "espresso",
    "decaf",
  ];

  return (
    <section id="shop" className="relative scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* section head */}
        <div ref={headRef} className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-caramel-400">
              <span className="h-px w-10 bg-caramel-500/70" />
              The shelf — spring cycle
            </p>
            <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] text-cream-100">
              This week's <em className="italic font-light text-caramel-400">roasts</em>.
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-faint pb-2">
            Showing {String(items.length).padStart(2, "0")} / {String(total).padStart(2, "0")} bags
          </p>
        </div>

        {/* controls */}
        <div
          ref={barRef}
          className="reveal mt-9 border border-line bg-bark-900/60 rounded-xl p-3 sm:p-4 flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* search */}
            <div className="relative flex-1 min-w-0">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-faint pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search beans, origins, tasting notes…"
                className="w-full bg-bark-800 border border-line rounded-lg pl-10 pr-10 py-3 text-sm text-cream-100 placeholder:text-faint focus:outline-none focus:border-caramel-500 focus:ring-1 focus:ring-caramel-500/40 transition-all"
                aria-label="Search products"
              />
              {search && (
                <button
                  onClick={() => onSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-cream-100 transition-colors"
                  aria-label="Clear search"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* sort */}
            <div className="relative md:w-60">
              <select
                value={sort}
                onChange={(e) => onSort(e.target.value as SortKey)}
                className="w-full appearance-none bg-bark-800 border border-line rounded-lg px-4 py-3 pr-10 font-mono text-[11px] uppercase tracking-[0.14em] text-cream-300 focus:outline-none focus:border-caramel-500 transition-colors cursor-pointer"
                aria-label="Sort products"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key} className="bg-bark-800">
                    {s.label}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-faint pointer-events-none"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* category chips */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => onCategory(c)}
                  className={`font-mono text-[10.5px] uppercase tracking-[0.18em] px-4 py-2 rounded-full border transition-all duration-200 active:scale-95 ${
                    active
                      ? "bg-caramel-400 border-caramel-400 text-bark-950 font-semibold shadow-[0_6px_20px_-8px_rgba(209,143,63,0.6)]"
                      : "border-line text-cream-300 hover:border-faint hover:text-cream-100 bg-transparent"
                  }`}
                  aria-pressed={active}
                >
                  {c === "all" ? "All beans" : CATEGORY_LABELS[c]}
                </button>
              );
            })}
          </div>
        </div>

        {/* grid */}
        {items.length > 0 ? (
          <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} onAdd={onAdd} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-bark-500 rounded-xl py-20 px-6 text-center">
            <BeanIcon className="w-12 h-12 mx-auto text-bark-500" strokeWidth={1.2} />
            <h3 className="mt-5 font-display text-2xl font-semibold text-cream-100">
              Nothing in the hopper
            </h3>
            <p className="mt-2 text-sm text-cream-300 max-w-sm mx-auto">
              No beans match “{search || CATEGORY_LABELS[category as Category]}”. Try a
              tasting note like <span className="text-caramel-300">honey</span> or clear
              your filters.
            </p>
            <button
              onClick={onReset}
              className="mt-6 inline-flex items-center gap-2 border border-caramel-500 text-caramel-300 hover:bg-caramel-400 hover:text-bark-950 font-mono text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-full transition-all active:scale-95"
            >
              <XIcon className="w-3.5 h-3.5" />
              Clear search &amp; filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
