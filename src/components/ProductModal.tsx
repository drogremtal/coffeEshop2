import { useEffect, useState } from "react";
import { CATEGORY_LABELS, formatPrice, type Product } from "../data/products";
import {
  GrindIcon,
  MinusIcon,
  MountainIcon,
  PlusIcon,
  RoastDots,
  ScaleIcon,
  ThermoIcon,
  TimerIcon,
  XIcon,
} from "./icons";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAdd: (p: Product, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const specs: { label: string; value: string }[] = [
    { label: "Process", value: product.process },
    { label: "Varietal", value: product.varietal },
    { label: "Altitude", value: product.altitude },
    { label: "Cupping score", value: `${product.score} / 100` },
  ];

  const brew = [
    { icon: <ScaleIcon className="w-4.5 h-4.5" />, label: "Ratio", value: product.brew.ratio },
    { icon: <ThermoIcon className="w-4.5 h-4.5" />, label: "Water", value: product.brew.temp },
    { icon: <TimerIcon className="w-4.5 h-4.5" />, label: "Time", value: product.brew.time },
    { icon: <GrindIcon className="w-4.5 h-4.5" />, label: "Grind", value: product.brew.grind },
  ];

  const lowStock = product.stock <= 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <div className="absolute inset-0 bg-bark-950/85 fade-in" onClick={onClose} />

      <div className="rise-in relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-xl border border-line bg-bark-800 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] grid md:grid-cols-[42%_1fr]">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-10 bg-bark-950/80 border border-line rounded-full p-2 text-cream-300 hover:text-cream-100 hover:border-caramel-500 hover:rotate-90 transition-all duration-300"
          aria-label="Close details"
        >
          <XIcon className="w-4 h-4" />
        </button>

        {/* image side */}
        <div className="relative h-56 md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-line">
          <img
            src={product.image}
            alt={`${product.name} coffee bag`}
            className="h-full w-full object-cover object-[50%_18%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bark-950/90 to-transparent" />
          <span className="absolute top-4 left-4 font-mono text-[9.5px] tracking-[0.2em] bg-bark-950/85 border border-line text-caramel-300 px-2.5 py-1 rounded-sm">
            {product.code}
          </span>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cream-300">
              {CATEGORY_LABELS[product.category]}
            </p>
            <p className="font-mono text-[11px] font-semibold bg-caramel-400 text-bark-950 px-2 py-1 rounded-sm">
              {product.score} PTS
            </p>
          </div>
        </div>

        {/* details side */}
        <div className="nice-scroll overflow-y-auto p-6 sm:p-8">
          <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
            <MountainIcon className="w-4 h-4 text-caramel-500" />
            {product.origin} — {product.region}
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-[-0.01em] text-cream-100">
            {product.name}
          </h2>
          <p className="mt-2 text-[15px] text-cream-300 italic font-display">{product.tagline}</p>

          {/* spec ledger */}
          <div className="mt-6 space-y-2.5">
            {specs.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint shrink-0">
                  {s.label}
                </span>
                <span className="flex-1 border-b border-dotted border-bark-500" />
                <span className="text-sm text-cream-100 text-right">{s.value}</span>
              </div>
            ))}
            {/* roast meter */}
            <div className="flex items-center gap-3 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint shrink-0">
                Roast
              </span>
              <span className="flex-1 border-b border-dotted border-bark-500" />
              <span className="flex items-center gap-2.5">
                <span className="text-sm text-cream-100">{product.roastLabel}</span>
                <RoastDots level={product.roast} />
              </span>
            </div>
            <div className="pl-[88px]">
              <div className="h-1.5 rounded-full bg-bark-600 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-caramel-300 via-caramel-500 to-copper-600 transition-all duration-700"
                  style={{ width: `${product.roast * 20}%` }}
                />
              </div>
            </div>
          </div>

          {/* notes */}
          <div className="mt-6 flex flex-wrap gap-2">
            {product.notes.map((n) => (
              <span
                key={n}
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-caramel-300 border border-caramel-600/40 bg-caramel-500/10 rounded-full px-3 py-1.5"
              >
                {n}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm leading-[1.75] text-cream-300">{product.description}</p>

          {/* brew guide */}
          <div className="mt-6 border border-line rounded-lg bg-bark-900/70 p-4 sm:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-caramel-400">
              Brew guide — {product.brew.method}
            </p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {brew.map((b) => (
                <div key={b.label} className="flex flex-col gap-1.5">
                  <span className="text-caramel-400">{b.icon}</span>
                  <span className="font-mono text-sm text-cream-100">{b.value}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* stock */}
          <p className="mt-5 flex items-center gap-2.5 text-[13px]">
            <span
              className={`w-2 h-2 rounded-full glow-pulse ${
                lowStock ? "bg-copper-500" : "bg-moss-400"
              }`}
            />
            {lowStock ? (
              <span className="text-caramel-300 font-semibold">
                Only {product.stock} bags left this cycle — nearly gone.
              </span>
            ) : (
              <span className="text-cream-300">
                In stock · roasted to order, ships within 48 hours.
              </span>
            )}
          </p>

          {/* purchase row */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-line pt-6">
            <div className="flex items-center justify-between sm:justify-start gap-1 border border-line rounded-full p-1 w-fit">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center text-cream-300 hover:bg-bark-600 hover:text-cream-100 transition-colors active:scale-90 disabled:opacity-30"
                disabled={qty <= 1}
                aria-label="Decrease quantity"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span key={qty} className="anim-pop w-8 text-center font-mono text-base text-cream-100">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(12, q + 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center text-cream-300 hover:bg-bark-600 hover:text-cream-100 transition-colors active:scale-90"
                aria-label="Increase quantity"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onAdd(product, qty)}
              className="flex-1 flex items-center justify-center gap-3 bg-caramel-400 hover:bg-caramel-300 text-bark-950 font-bold text-sm sm:text-[15px] px-6 py-3.5 rounded-full transition-all active:scale-[0.97] shadow-[0_12px_30px_-12px_rgba(209,143,63,0.6)]"
            >
              Add {qty > 1 ? `${qty} ` : ""}to bag
              <span className="font-mono font-semibold">
                · {formatPrice(product.price * qty)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
