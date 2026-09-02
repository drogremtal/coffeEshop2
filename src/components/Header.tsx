import { useState } from "react";
import { BagIcon, CupIcon, XIcon } from "./icons";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onNavigate: (id: string) => void;
}

const NAV = [
  { label: "The Shelf", id: "shop" },
  { label: "Roast Scale", id: "roast-scale" },
  { label: "Visit", id: "visit" },
];

export default function Header({ cartCount, onCartOpen, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: string) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bark-950/92 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-[72px] items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
            aria-label="Back to top"
          >
            <span className="text-caramel-400 group-hover:text-caramel-300 transition-colors">
              <CupIcon className="w-9 h-9" strokeWidth={1.5} />
            </span>
            <span className="text-left leading-none">
              <span className="block font-display text-xl font-semibold tracking-tight text-cream-100">
                Ember <span className="text-caramel-400">&amp;</span> Oak
              </span>
              <span className="block font-mono text-[9px] tracking-[0.34em] text-faint mt-1">
                ROASTING CO.
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="relative font-mono text-[11px] uppercase tracking-[0.22em] text-cream-300 hover:text-caramel-300 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-caramel-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={onCartOpen}
              className="relative flex items-center gap-2.5 border border-line bg-bark-800 hover:border-caramel-500 hover:bg-bark-700 rounded-full pl-4 pr-4 py-2.5 transition-all active:scale-95"
              aria-label={`Open cart, ${cartCount} items`}
            >
              <BagIcon className="w-[18px] h-[18px] text-cream-100" />
              <span className="hidden sm:inline text-sm font-semibold text-cream-100">
                Bag
              </span>
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="anim-pop absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-caramel-400 text-bark-950 text-[11px] font-bold flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 border border-line rounded-full bg-bark-800 hover:border-caramel-500 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <XIcon className="w-4 h-4 text-cream-100" />
              ) : (
                <>
                  <span className="block w-4 h-px bg-cream-100" />
                  <span className="block w-4 h-px bg-cream-100" />
                  <span className="block w-2.5 h-px bg-caramel-400 self-center" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden rise-in border-t border-line py-4 flex flex-col gap-1">
            {NAV.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="text-left font-mono text-xs uppercase tracking-[0.22em] text-cream-300 hover:text-caramel-300 hover:bg-bark-800 rounded-md px-3 py-3 transition-colors"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="text-caramel-500 mr-3">0{i + 1}</span>
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
