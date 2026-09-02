import { useEffect } from "react";
import {
  FLAT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  formatPrice,
  type Product,
} from "../data/products";
import { ArrowIcon, BagIcon, CupIcon, MinusIcon, PlusIcon, XIcon } from "./icons";

export interface DetailedItem {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  items: DetailedItem[];
  subtotal: number;
  onClose: () => void;
  onSetQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onBrowse: () => void;
}

export default function CartDrawer({
  items,
  subtotal,
  onClose,
  onSetQty,
  onRemove,
  onCheckout,
  onBrowse,
}: CartDrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="absolute inset-0 bg-bark-950/80 fade-in" onClick={onClose} />

      <aside className="drawer-in absolute right-0 top-0 h-full w-full max-w-md bg-bark-900 border-l border-line flex flex-col shadow-[-30px_0_80px_-30px_rgba(0,0,0,0.9)]">
        {/* head */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-line">
          <div>
            <h2 className="font-display text-2xl font-semibold text-cream-100">Your bag</h2>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
              {count} {count === 1 ? "bag" : "bags"} · {formatPrice(subtotal)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-cream-300 hover:text-cream-100 hover:border-caramel-500 hover:rotate-90 transition-all duration-300"
            aria-label="Close bag"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {items.length === 0 ? (
          /* empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <span className="text-bark-500">
              <CupIcon className="w-16 h-16" strokeWidth={1.2} />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold text-cream-100">
              Nothing brewing yet
            </h3>
            <p className="mt-2 text-sm text-cream-300 leading-relaxed">
              Your bag is empty. The shelf, however, is full of things worth
              slowing down for.
            </p>
            <button
              onClick={onBrowse}
              className="mt-7 flex items-center gap-2.5 bg-caramel-400 hover:bg-caramel-300 text-bark-950 font-bold text-sm px-6 py-3 rounded-full transition-all active:scale-95"
            >
              Browse the shelf
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* free shipping meter */}
            <div className="px-5 sm:px-6 py-4 border-b border-line bg-bark-800/50">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-300">
                  {remaining > 0 ? (
                    <>
                      Add <span className="text-caramel-300 font-semibold">{formatPrice(remaining)}</span> for free shipping
                    </>
                  ) : (
                    <span className="text-moss-300">Free shipping unlocked</span>
                  )}
                </p>
                <BagIcon className={`w-4 h-4 ${remaining > 0 ? "text-faint" : "text-moss-400"}`} />
              </div>
              <div className="mt-2.5 h-1.5 rounded-full bg-bark-600 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-caramel-500 to-copper-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* items */}
            <div className="nice-scroll flex-1 overflow-y-auto divide-y divide-line">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 p-5 group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-20 object-cover object-[50%_18%] rounded-md border border-line shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display text-lg font-semibold leading-tight text-cream-100">
                          {product.name}
                        </h4>
                        <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                          {product.origin} · {product.weight}
                        </p>
                      </div>
                      <p className="font-mono text-sm text-cream-100 shrink-0">
                        {formatPrice(product.price * qty)}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 border border-line rounded-full p-0.5">
                        <button
                          onClick={() => onSetQty(product.id, qty - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-cream-300 hover:bg-bark-600 hover:text-cream-100 transition-colors active:scale-90"
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          <MinusIcon className="w-3.5 h-3.5" />
                        </button>
                        <span key={qty} className="anim-pop w-7 text-center font-mono text-[13px] text-cream-100">
                          {qty}
                        </span>
                        <button
                          onClick={() => onSetQty(product.id, qty + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-cream-300 hover:bg-bark-600 hover:text-cream-100 transition-colors active:scale-90"
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          <PlusIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint hover:text-copper-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="border-t border-line px-5 sm:px-6 py-5 space-y-2 bg-bark-900">
              <div className="flex justify-between text-sm text-cream-300">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-cream-300">
                <span>Shipping</span>
                <span className={`font-mono ${shipping === 0 ? "text-moss-300" : ""}`}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-bark-500">
                <span className="font-display text-lg font-semibold text-cream-100">Total</span>
                <span className="font-mono text-xl text-caramel-300">
                  {formatPrice(subtotal + shipping)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="mt-3 w-full flex items-center justify-center gap-3 bg-caramel-400 hover:bg-caramel-300 text-bark-950 font-bold text-[15px] px-6 py-4 rounded-full transition-all active:scale-[0.98] shadow-[0_12px_30px_-12px_rgba(209,143,63,0.6)]"
              >
                Check out
                <ArrowIcon className="w-4 h-4" />
              </button>
              <p className="pt-1 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                Demo checkout — no real payment taken
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
