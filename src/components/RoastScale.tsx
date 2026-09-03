import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { FlameIcon, LeafIcon, TruckIcon } from "./icons";

const LEVELS = [
  {
    name: "Светлая",
    color: "#d9b183",
    blurb:
      "Выгружаем сразу после первого крэка. Максимум характера происхождения: цветы, цитрус, чайная прозрачность. Здесь живёт «Утренний дозор».",
  },
  {
    name: "Средне-светлая",
    color: "#c1955f",
    blurb:
      "Ещё несколько секунд в барабане. Кислотность смягчается в сладость косточковых, тело округляется. Территория «Облачного леса».",
  },
  {
    name: "Средняя",
    color: "#9c6f42",
    blurb:
      "Точка равновесия: карамелизованные сахара, деликатная кислотность, чашка, которой хорошо и чёрной, и с молоком. «Бархатный час» и «Уголёк».",
  },
  {
    name: "Средне-тёмная",
    color: "#6e4a2c",
    blurb:
      "На подходе ко второму крэку. Горьковатое какао, жареный орех, сиропная плотность. Здесь оседает купаж «Очаг».",
  },
  {
    name: "Тёмная",
    color: "#3a2417",
    blurb:
      "По самой грани второго крэка — и никогда дальше. Без дыма, с глубиной патоки; создана прорезать молоко. «Ночная смена».",
  },
];

const PROMISES = [
  {
    icon: <TruckIcon className="w-5 h-5" />,
    title: "Обжарка под заказ",
    copy: "Ваш пакет попадает в барабан после клика, а не до. Отправляем в течение 48 часов.",
  },
  {
    icon: <FlameIcon className="w-5 h-5" />,
    title: "Профили вручную",
    copy: "Каждому лоту — своя кривая обжарки и три каппинга до того, как на пакет ляжет этикетка.",
  },
  {
    icon: <LeafIcon className="w-5 h-5" />,
    title: "Прямая оплата фермерам",
    copy: "Покупаем напрямую у 26 ферм-партнёров — в среднем в 2,4 раза выше биржевой цены.",
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
            Шкала обжарки
          </p>
          <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl tracking-[-0.02em] text-cream-100">
            От <em className="italic font-light text-caramel-400">блонда</em> до{" "}
            <em className="italic font-light text-cream-300">угольного</em>.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-cream-300">
            Обжариваем в пяти точках шкалы и честно пишем об этом на каждом пакете.
            Наведите курсор — увидите, где живёт каждый лот и чего ждать в чашке.
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
                  aria-label={`Обжарка: ${l.name.toLowerCase()}`}
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
                    className={`absolute left-1/2 -translate-x-1/2 bottom-1.5 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.14em] transition-all duration-300 whitespace-nowrap ${
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
                {LEVELS[active].name} обжарка.
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
