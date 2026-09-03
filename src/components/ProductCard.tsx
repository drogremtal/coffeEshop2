import { formatPrice, type Product } from "../data/products";
import { useReveal } from "../hooks/useReveal";
import { PlusIcon, RoastDots } from "./icons";

interface ProductCardProps {
  product: Product;
  index: number;
  onOpen: (p: Product) => void;
  onAdd: (p: Product) => void;
}

export default function ProductCard({ product, index, onOpen, onAdd }: ProductCardProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${(index % 3) * 90}ms` }}>
      <article
        onClick={() => onOpen(product)}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-bark-900 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-faint/80 hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.9)]"
      >
        {/* image */}
        <div className="relative overflow-hidden aspect-[4/4.4]">
          <img
            src={product.image}
            alt={`«${product.name}» — пакет кофе ${product.weight}`}
            loading="lazy"
            className="h-full w-full object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bark-900 to-transparent pointer-events-none" />

          {/* stamps */}
          <span className="absolute top-3 left-3 font-mono text-[9.5px] tracking-[0.2em] bg-bark-950/85 border border-line text-caramel-300 px-2.5 py-1 rounded-sm">
            {product.code}
          </span>
          <span className="absolute top-3 right-3 font-mono text-[10px] font-semibold bg-caramel-400 text-bark-950 px-2 py-1 rounded-sm">
            {product.score} БАЛЛОВ
          </span>

          {/* quick view */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen(product);
              }}
              className="w-full bg-bark-950/90 border border-line hover:border-caramel-500 rounded-md py-2.5 font-mono text-[10.5px] uppercase tracking-[0.26em] text-cream-100 transition-colors"
            >
              Быстрый просмотр
            </button>
          </div>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              {product.origin} · {product.roastLabel}
            </p>
            <RoastDots level={product.roast} />
          </div>

          <h3 className="font-display text-[1.55rem] font-semibold leading-tight text-cream-100 transition-colors duration-300 group-hover:text-caramel-300">
            {product.name}
          </h3>

          <p className="text-sm leading-relaxed text-cream-300">{product.tagline}</p>

          <div className="flex flex-wrap gap-1.5">
            {product.notes.map((n) => (
              <span
                key={n}
                className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-cream-500 border border-line rounded-full px-2.5 py-1 transition-colors group-hover:border-bark-500"
              >
                {n}
              </span>
            ))}
          </div>

          {/* footer */}
          <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
            <p className="font-mono text-lg text-cream-100">
              {formatPrice(product.price)}
              <span className="ml-1.5 text-[10px] text-faint">/ {product.weight}</span>
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(product);
              }}
              className="group/add flex items-center bg-caramel-400 hover:bg-caramel-300 text-bark-950 rounded-full pl-3 pr-3 py-2.5 transition-all duration-200 active:scale-90 shadow-[0_8px_20px_-10px_rgba(209,143,63,0.7)]"
              aria-label={`Добавить «${product.name}» в корзину`}
            >
              <PlusIcon className="w-4 h-4" strokeWidth={2.4} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover/add:max-w-[5.5rem] group-hover/add:ml-1.5 text-sm font-bold">
                В корзину
              </span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
