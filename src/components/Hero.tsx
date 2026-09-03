import { HERO_IMAGE, PRODUCTS } from "../data/products";
import { useReveal } from "../hooks/useReveal";
import { ArrowIcon, BeanIcon, StarIcon } from "./icons";

interface HeroProps {
  onShop: () => void;
  onRoastScale: () => void;
}

const STATS = [
  { value: "06", label: "лотов на полке" },
  { value: "26", label: "ферм-партнёров" },
  { value: "48 ч", label: "от обжарки до отправки" },
  { value: "86+", label: "нижний балл каппинга" },
];

export default function Hero({ onShop, onRoastScale }: HeroProps) {
  const leftRef = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>();
  const curveRef = useReveal<HTMLDivElement>();

  const tickerNotes = PRODUCTS.flatMap((p) => p.notes);

  return (
    <section className="relative overflow-hidden">
      {/* ambient layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(52% 44% at 18% 8%, rgba(209,143,63,0.14), transparent 70%), radial-gradient(40% 36% at 88% 80%, rgba(190,91,46,0.10), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bean-field opacity-[0.05] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ---- Left: manifesto ---- */}
          <div ref={leftRef} className="reveal lg:col-span-7 lg:pr-6">
            <p className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-caramel-400">
              <span className="h-px w-10 bg-caramel-500/70" />
              Крафтовая обжарка · малые партии · с 2017 года
            </p>

            <h1 className="mt-6 font-display font-semibold text-[2.7rem] leading-[1.05] sm:text-6xl xl:text-[4.4rem] tracking-[-0.02em] text-cream-100">
              Зерно, у которого есть{" "}
              <em className="text-caramel-400 font-light italic">родной дом</em>, —
              <br className="hidden sm:block" /> обжаренное на дубовом{" "}
              <em className="font-light italic text-cream-300">угле</em>.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-cream-300">
              Шесть монолотов на полке на этой неделе: каппинг от 86 баллов,
              обжарка под заказ и отправка в течение 48 часов после барабана.
              Никаких складских пакетов и безымянных смесей.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onShop}
                className="group flex items-center gap-3 bg-caramel-400 hover:bg-caramel-300 text-bark-950 font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-full transition-all active:scale-95 shadow-[0_10px_30px_-12px_rgba(209,143,63,0.55)]"
              >
                Смотреть витрину
                <ArrowIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={onRoastScale}
                className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-cream-300 hover:text-caramel-300 border-b border-bark-500 hover:border-caramel-500 pb-1 transition-colors"
              >
                Как мы обжариваем ↓
              </button>
            </div>

            {/* roast curve */}
            <div
              ref={curveRef}
              className="reveal mt-10 flex flex-col sm:flex-row sm:items-center gap-5 border-t border-line pt-7"
            >
              <svg viewBox="0 0 220 84" className="w-52 shrink-0 text-caramel-400" fill="none" aria-hidden="true">
                <path d="M8 78h204M8 78V8" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
                <path d="M8 70h12" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 4" />
                <path
                  className="draw-path"
                  d="M10 66 C 30 18, 58 12, 86 20 C 118 29, 128 44, 150 47 C 172 50, 186 38, 208 30"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="47" r="3.4" fill="#be5b2e" className="glow-pulse" />
                <circle cx="208" cy="30" r="3" fill="currentColor" />
              </svg>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-faint">
                  Лот №41 — «Утренний дозор» · профиль обжарки
                </p>
                <p className="mt-1.5 font-mono text-xs sm:text-[13px] text-cream-300">
                  Засыпка 180° <span className="text-faint">→</span> точка разворота 1:48{" "}
                  <span className="text-faint">→</span>{" "}
                  <span className="text-copper-500">первый крэк 8:12</span>{" "}
                  <span className="text-faint">→</span> выгрузка 204° на 9:42
                </p>
              </div>
            </div>

            {/* ledger stats */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 border border-line rounded-lg overflow-hidden bg-bark-900/50">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-5 py-4 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                    i >= 2 ? "border-t sm:border-t-0 sm:border-l border-line" : ""
                  }`}
                >
                  <p className="font-display text-2xl sm:text-[1.7rem] font-semibold text-cream-100">
                    {s.value}
                  </p>
                  <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Right: arched pour ---- */}
          <div ref={rightRef} className="reveal lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px]">
              <div className="rounded-t-full border border-line overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
                <img
                  src={HERO_IMAGE}
                  alt="Медленный пуровер: вода из чайника с гусиной шеей льётся в керамическую воронку"
                  className="w-full aspect-[3/4.1] object-cover transition-transform duration-[1400ms] hover:scale-[1.045]"
                />
              </div>

              {/* rotating stamp */}
              <div className="absolute -left-8 sm:-left-12 bottom-14 w-28 h-28 sm:w-32 sm:h-32 hidden sm:block">
                <svg viewBox="0 0 120 120" className="stamp-spin w-full h-full text-caramel-400" aria-hidden="true">
                  <defs>
                    <path id="stampCircle" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
                  </defs>
                  <circle cx="60" cy="60" r="57" fill="rgba(20,13,9,0.88)" stroke="currentColor" strokeOpacity="0.35" />
                  <text fontSize="8.8" letterSpacing="2.1" fill="currentColor" fontFamily="IBM Plex Mono, monospace">
                    <textPath href="#stampCircle">
                      МАЛЫЕ ПАРТИИ · ОБЖАРКА ЕЖЕНЕДЕЛЬНО · С 2017 ·
                    </textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-caramel-300">
                  <BeanIcon className="w-7 h-7" strokeWidth={1.5} />
                </span>
              </div>

              {/* floating spec card */}
              <div className="float-soft absolute top-10 -right-2 sm:-right-6 bg-bark-800 border border-line rounded-lg px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.85)]">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">
                  Лот №41 — «Утренний дозор»
                </p>
                <p className="mt-1 flex items-center gap-1.5 font-display text-2xl font-semibold text-cream-100">
                  92 <span className="text-sm text-faint font-body">балла</span>
                  <StarIcon className="w-4 h-4 text-caramel-400" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tasting-note ticker */}
      <div className="marquee relative mt-14 md:mt-20 border-y border-line bg-bark-900/70 py-3.5 overflow-hidden">
        <div className="marquee-track items-center gap-8">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-8 pr-8"
              aria-hidden={copy === 1}
            >
              {tickerNotes.map((note, i) => (
                <span key={`${copy}-${i}`} className="flex items-center gap-8">
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-cream-500 whitespace-nowrap">
                    {note}
                  </span>
                  <BeanIcon className="w-3.5 h-3.5 text-caramel-500 shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
