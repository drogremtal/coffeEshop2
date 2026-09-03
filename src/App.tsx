import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shop, { type SortKey } from "./components/Shop";
import ProductModal from "./components/ProductModal";
import CartDrawer, { type DetailedItem } from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import RoastScale from "./components/RoastScale";
import Footer from "./components/Footer";
import Toast, { type ToastData } from "./components/Toast";
import {
  CATEGORY_LABELS,
  FLAT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  PRODUCTS,
  type Category,
  type Product,
} from "./data/products";

interface CartLine {
  id: string;
  qty: number;
}

const CART_KEY = "ember-oak-cart-v1";

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed.filter((l) => l && l.id && l.qty > 0) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [cart, setCart] = useState<CartLine[]>(loadCart);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [active, setActive] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  /* ---------- persistence ---------- */
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* private mode — carry on */
    }
  }, [cart]);

  /* ---------- body scroll lock ---------- */
  const overlayOpen = active !== null || cartOpen || checkoutOpen;
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  /* ---------- toast auto-dismiss ---------- */
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((msg: string) => {
    setToast({ id: Date.now(), msg });
  }, []);

  /* ---------- cart ops ---------- */
  const detailed: DetailedItem[] = useMemo(
    () =>
      cart
        .map((line) => {
          const product = PRODUCTS.find((p) => p.id === line.id);
          return product ? { product, qty: line.qty } : null;
        })
        .filter((x): x is DetailedItem => x !== null),
    [cart]
  );

  const count = detailed.reduce((n, i) => n + i.qty, 0);
  const subtotal = detailed.reduce((n, i) => n + i.product.price * i.qty, 0);
  const shipping =
    detailed.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  const addToCart = useCallback(
    (product: Product, qty = 1, openDrawer = false) => {
      setCart((prev) => {
        const existing = prev.find((l) => l.id === product.id);
        if (existing) {
          return prev.map((l) =>
            l.id === product.id ? { ...l, qty: Math.min(12, l.qty + qty) } : l
          );
        }
        return [...prev, { id: product.id, qty: Math.min(12, qty) }];
      });
      showToast(
        qty > 1
          ? `«${product.name}» ×${qty} — в корзине`
          : `«${product.name}» — в корзине`
      );
      setActive(null);
      if (openDrawer) setCartOpen(true);
    },
    [showToast]
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(12, qty) } : l))
    );
  }, []);

  const removeLine = useCallback(
    (id: string) => {
      setCart((prev) => prev.filter((l) => l.id !== id));
      const p = PRODUCTS.find((x) => x.id === id);
      if (p) showToast(`«${p.name}» — убран из корзины`);
    },
    [showToast]
  );

  /* ---------- filtering + sorting ---------- */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const hay = [
        p.name,
        p.origin,
        p.region,
        p.process,
        p.varietal,
        p.roastLabel,
        CATEGORY_LABELS[p.category],
        ...p.notes,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "roast-asc":
        list = [...list].sort((a, b) => a.roast - b.roast);
        break;
      case "roast-desc":
        list = [...list].sort((a, b) => b.roast - a.roast);
        break;
      default:
        list = [...list].sort((a, b) => b.score - a.score);
    }
    return list;
  }, [search, category, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("featured");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen">
      {/* film grain over everything */}
      <div className="noise-layer fixed inset-0 z-[80] pointer-events-none" />

      <Header
        cartCount={count}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={scrollTo}
      />

      <main>
        <Hero onShop={() => scrollTo("shop")} onRoastScale={() => scrollTo("roast-scale")} />

        <Shop
          items={filtered}
          total={PRODUCTS.length}
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
          sort={sort}
          onSort={setSort}
          onOpen={setActive}
          onAdd={(p) => addToCart(p, 1)}
          onReset={resetFilters}
        />

        <RoastScale />
      </main>

      <Footer onToast={showToast} />

      {/* ---------- overlays ---------- */}
      {active && (
        <ProductModal
          key={active.id}
          product={active}
          onClose={() => setActive(null)}
          onAdd={(p, qty) => addToCart(p, qty, true)}
        />
      )}

      {cartOpen && (
        <CartDrawer
          items={detailed}
          subtotal={subtotal}
          onClose={() => setCartOpen(false)}
          onSetQty={setQty}
          onRemove={removeLine}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
          onBrowse={() => {
            setCartOpen(false);
            scrollTo("shop");
          }}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal
          items={detailed}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onComplete={() => setCart([])}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
