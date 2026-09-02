import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { FlameIcon, LeafIcon, TruckIcon } from "./icons";

const LEVELS = [
  {
    name: "Light",
    color: "#d9b183",
    blurb:
      "Dropped shortly after first crack. Maximum origin character — florals, citrus, tea-like clarity. Our Dawn Patrol lives here.",
  },
  {
    name: "Medium-light",
    color: "#c1955f",
    blurb:
      "A few seconds further in. Acidity softens into stone-fruit sweetness and the body rounds out. Cloud Forest territory.",
  },
  {
    name: "Medium",
    color: "#9c6f42",
    blurb:
      "The balance point — caramelized sugars, gentle acidity, a cup that works black or with a splash of milk. Velvet Hour, Ember Decaf.",
  },
  {
    name: "Medium-dark",
    color: "#6e4a2c",
    blurb:
      "Into the second-crack approach. Bittersweet cocoa, toasted nuts, syrupy weight. Where the Hearth Blend settles.",
  },
  {
    name: "Dark",
    color: "#3a2417",
    blurb:
      "Riding the edge of second crack — never past it. Smoke-free, molasses-deep, built to cut through steamed milk. Night Shift.",
  },
];

const PROMISES = [
  {
    icon: <TruckIcon className="w-5 h-5" />,
    title: "Roasted to order",
    copy: "Your bag hits the drum after you click, never before. Ships within 48 hours.",
  },
  {
    icon: <FlameIcon className="w-5 h-5" />,
    title: "Profiled by hand",
    copy: "Every lot gets its own roast curve, cupped three times before it earns a label.",
  },
  {
    icon: <LeafIcon className="w-5 h-5" />,
    title: "Paid at origin",
    copy: "We buy direct from 26 farm partners at an average of 2.4× the commodity price.",
  },
];

export default function RoastScale() {
  const [active, setActive] = useState(2);
  const headRef = useReveal<HTMLDivElement>();
  const barRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section id="roast-scale" className="relative border-t border-line bg-bark-900/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div ref={headRef} className="reveal max-w-2xl">
          <p className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-caramel-400">
            <span className="h-px w-10 bg-caramel-500/70" />
            The roast scale
          </p>
          <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl tracking-[-0.02em] text-cream-100">
            From <em className="italic font-light text-caramel-400">blonde</em> to{" "}
            <em className="italic font-light text-cream-300">blackstrap</em>.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-cream-300">
            We roast across five stops and label every bag honestly. Hover the scale
            to see where each coffee lands — and what to expect in the cup.
          </p>
        </div>

        {/* interactive scale */}
        <div ref={barRef} className="reveal mt-10">
          <div className="relative rounded-lg overflow-hidden border border-line">
            <div
              className="h-16 sm:h-20"
              style={{
                background:
                  "linear-gradient(90deg,#e3c08f 0%,#d9b183 12%,#c1955f 32%,#9c6f42 52%,#6e4a2c 74%,#3a2417 90%,#241409 100%)",
              }}
            />
            <div className="absolute inset-0 flex">
              {LEVELS.map((l, i) => (
                <button
                  key={l.name}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group relative flex-1 outline-none"
                  aria-label={`${l.name} roast`}
                >
                  <span
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${
                      active === i
                        ? "w-5 h-5 border-cream-100 shadow-[0_0_0_5px_rgba(20,13,9,0.45)]"
                        : "w-2.5 h-2.5 border-cream-100/70 bg-bark-950/30 group-hover:scale-125"
                    }`}
                    style={active === i ? { backgroundColor: l.color } : undefined}
                  />
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-1.5 font-mono text-[8.5px] sm:text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                      active === i ? "text-cream-100 font-semibold" : "text-bark-950/70"
                    }`}
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                  >
                    {l.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 min-h-[76px] border border-line rounded-lg bg-bark-800/60 px-5 py-4 flex items-start gap-4">
            <span
              className="mt-1 w-3.5 h-3.5 rounded-full shrink-0 border border-bark-950/40 transition-colors duration-300"
              style={{ backgroundColor: LEVELS[active].color }}
            />
            <p key={active} className="rise-in text-sm sm:text-[15px] leading-relaxed text-cream-300">
              <span className="font-display font-semibold text-cream-100 text-base sm:text-lg mr-2">
                {LEVELS[active].name} roast.
              </span>
              {LEVELS[active].blurb}
            </p>
          </div>
        </div>

        {/* promises ledger */}
        <div ref={listRef} className="reveal mt-14 grid md:grid-cols-3 border-t border-line pt-10 gap-8 md:gap-10">
          {PROMISES.map((p, i) => (
            <div key={p.title} className="flex gap-4">
              <span className="shrink-0 w-11 h-11 rounded-full border border-line bg-bark-800 flex items-center justify-center text-caramel-400">
                {p.icon}
              </span>
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint">
                  0{i + 1}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-cream-100">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream-300">{p.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
