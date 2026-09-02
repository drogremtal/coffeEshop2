import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../data/products";
import type { DetailedItem } from "./CartDrawer";
import { ArrowIcon, BeanIcon, CheckIcon, XIcon } from "./icons";

type Step = "shipping" | "payment" | "processing" | "done";

interface CheckoutModalProps {
  items: DetailedItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

interface Fields {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const EMPTY: Fields = {
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1.5 w-full bg-bark-800 border rounded-lg px-3.5 py-2.5 text-sm text-cream-100 placeholder:text-bark-500 focus:outline-none focus:ring-1 transition-all ${
          mono ? "font-mono tracking-wider" : ""
        } ${
          error
            ? "border-copper-500 focus:border-copper-500 focus:ring-copper-500/40"
            : "border-line focus:border-caramel-500 focus:ring-caramel-500/40"
        }`}
      />
      {error && (
        <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.14em] text-copper-500">
          {error}
        </span>
      )}
    </label>
  );
}

export default function CheckoutModal({
  items,
  subtotal,
  shipping,
  total,
  onClose,
  onComplete,
}: CheckoutModalProps) {
  // snapshot so the confirmation screen survives the cart being cleared
  const [snapshot] = useState(items);
  const [snapTotal] = useState(total);
  const [step, setStep] = useState<Step>("shipping");
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [orderId, setOrderId] = useState("");
  const [delivery, setDelivery] = useState("");
  const completedRef = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processing") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  const set = (k: keyof Fields) => (v: string) => {
    let val = v;
    if (k === "cardNumber")
      val = v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (k === "expiry") {
      val = v.replace(/\D/g, "").slice(0, 4);
      if (val.length > 2) val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    if (k === "cvc") val = v.replace(/\D/g, "").slice(0, 4);
    if (k === "zip") val = v.slice(0, 10);
    setF((prev) => ({ ...prev, [k]: val }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validateShipping = () => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!f.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Valid email needed";
    if (!f.address.trim()) e.address = "Required";
    if (!f.city.trim()) e.city = "Required";
    if (f.zip.trim().length < 3) e.zip = "Too short";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!f.cardName.trim()) e.cardName = "Required";
    if (f.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "16 digits needed";
    if (!/^\d{2}\/\d{2}$/.test(f.expiry)) e.expiry = "MM/YY";
    if (f.cvc.length < 3) e.cvc = "3–4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validatePayment()) return;
    setStep("processing");
    window.setTimeout(() => {
      setOrderId(`EO-${Math.floor(1000 + Math.random() * 9000)}`);
      const d = new Date();
      d.setDate(d.getDate() + 4 + Math.floor(Math.random() * 3));
      setDelivery(
        d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
      );
      setStep("done");
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 1900);
  };

  const stepIndex = step === "shipping" ? 0 : step === "payment" ? 1 : 2;
  const count = snapshot.reduce((n, i) => n + i.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <div
        className="absolute inset-0 bg-bark-950/85 fade-in"
        onClick={() => step !== "processing" && onClose()}
      />

      <div className="rise-in nice-scroll relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-xl border border-line bg-bark-800 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]">
        {step !== "processing" && (
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-10 bg-bark-950/80 border border-line rounded-full p-2 text-cream-300 hover:text-cream-100 hover:border-caramel-500 hover:rotate-90 transition-all duration-300"
            aria-label="Close checkout"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}

        <div className="p-6 sm:p-8">
          {/* progress */}
          {step !== "done" && (
            <div className="flex items-center gap-0 pr-8">
              {["Details", "Payment", "Confirm"].map((label, i) => (
                <div key={label} className={`flex items-center ${i < 2 ? "flex-1" : ""}`}>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] border transition-all duration-300 ${
                        i < stepIndex || step === "processing"
                          ? "bg-moss-500 border-moss-500 text-bark-950"
                          : i === stepIndex
                            ? "bg-caramel-400 border-caramel-400 text-bark-950"
                            : "border-bark-500 text-faint"
                      }`}
                    >
                      {i < stepIndex || step === "processing" ? (
                        <CheckIcon className="w-3.5 h-3.5" />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span
                      className={`font-mono text-[9.5px] uppercase tracking-[0.18em] ${
                        i === stepIndex ? "text-caramel-300" : "text-faint"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 2 && (
                    <span
                      className={`flex-1 h-px mx-3 transition-colors duration-500 ${
                        i < stepIndex || step === "processing" ? "bg-moss-500" : "bg-line"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ---------- STEP: shipping ---------- */}
          {step === "shipping" && (
            <div className="rise-in mt-7">
              <h2 className="font-display text-3xl font-semibold text-cream-100">
                Where's it brewing?
              </h2>
              <p className="mt-1.5 text-sm text-cream-300">
                {count} {count === 1 ? "bag" : "bags"} · ships from Portland within 48h of roast.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Full name" value={f.name} onChange={set("name")} error={errors.name} placeholder="Jo Roaster" />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Email" value={f.email} onChange={set("email")} error={errors.email} placeholder="jo@slowmornings.com" />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Street address" value={f.address} onChange={set("address")} error={errors.address} placeholder="418 Alder St, Apt 2" />
                </div>
                <Field label="City" value={f.city} onChange={set("city")} error={errors.city} placeholder="Portland" />
                <Field label="ZIP / Postcode" value={f.zip} onChange={set("zip")} error={errors.zip} placeholder="97204" mono />
              </div>
              <button
                onClick={() => validateShipping() && setStep("payment")}
                className="mt-7 w-full flex items-center justify-center gap-3 bg-caramel-400 hover:bg-caramel-300 text-bark-950 font-bold text-[15px] px-6 py-4 rounded-full transition-all active:scale-[0.98]"
              >
                Continue to payment
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ---------- STEP: payment ---------- */}
          {step === "payment" && (
            <div className="rise-in mt-7">
              <h2 className="font-display text-3xl font-semibold text-cream-100">
                Settle the tab
              </h2>
              <p className="mt-1.5 text-sm text-cream-300">
                Simulated payment — nothing is charged, nothing is stored.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Field label="Name on card" value={f.cardName} onChange={set("cardName")} error={errors.cardName} placeholder="JO ROASTER" />
                </div>
                <div className="col-span-2">
                  <Field label="Card number" value={f.cardNumber} onChange={set("cardNumber")} error={errors.cardNumber} placeholder="4242 4242 4242 4242" mono />
                </div>
                <Field label="Expiry" value={f.expiry} onChange={set("expiry")} error={errors.expiry} placeholder="MM/YY" mono />
                <Field label="CVC" value={f.cvc} onChange={set("cvc")} error={errors.cvc} placeholder="123" mono />
              </div>

              {/* order summary */}
              <div className="mt-6 border border-line rounded-lg bg-bark-900/70 p-4">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint">
                  Order summary
                </p>
                <div className="mt-3 space-y-1.5">
                  {snapshot.map(({ product, qty }) => (
                    <div key={product.id} className="flex justify-between text-[13px]">
                      <span className="text-cream-300">
                        {product.name} <span className="text-faint">×{qty}</span>
                      </span>
                      <span className="font-mono text-cream-100">
                        {formatPrice(product.price * qty)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-[13px] pt-1.5 border-t border-dashed border-bark-500">
                    <span className="text-cream-300">Shipping</span>
                    <span className={`font-mono ${shipping === 0 ? "text-moss-300" : "text-cream-100"}`}>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-display font-semibold text-cream-100">Total</span>
                    <span className="font-mono text-lg text-caramel-300">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep("shipping")}
                  className="px-5 py-4 rounded-full border border-line text-cream-300 hover:border-faint hover:text-cream-100 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={placeOrder}
                  className="flex-1 flex items-center justify-center gap-3 bg-caramel-400 hover:bg-caramel-300 text-bark-950 font-bold text-[15px] px-6 py-4 rounded-full transition-all active:scale-[0.98] shadow-[0_12px_30px_-12px_rgba(209,143,63,0.6)]"
                >
                  Place order · {formatPrice(total)}
                </button>
              </div>
            </div>
          )}

          {/* ---------- STEP: processing ---------- */}
          {step === "processing" && (
            <div className="rise-in py-14 flex flex-col items-center text-center">
              <svg viewBox="0 0 48 48" className="loader-spin w-14 h-14 text-caramel-400" fill="none">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
                <path d="M44 24a20 20 0 0 0-20-20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <h2 className="mt-7 font-display text-2xl font-semibold text-cream-100">
                Talking to the roastery…
              </h2>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
                Encrypting · reserving your bags · printing the label
              </p>
            </div>
          )}

          {/* ---------- STEP: done ---------- */}
          {step === "done" && (
            <div className="rise-in py-4 flex flex-col items-center text-center">
              <span className="anim-pop w-16 h-16 rounded-full bg-moss-500 flex items-center justify-center text-bark-950 shadow-[0_16px_40px_-12px_rgba(126,143,96,0.7)]">
                <CheckIcon className="w-7 h-7" strokeWidth={2.6} />
              </span>
              <h2 className="mt-6 font-display text-3xl sm:text-4xl font-semibold text-cream-100">
                Order confirmed
              </h2>
              <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-caramel-300 border border-caramel-600/40 bg-caramel-500/10 rounded-full px-4 py-2">
                <BeanIcon className="w-3.5 h-3.5" />
                {orderId}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-cream-300 max-w-sm">
                Your beans go on the drum with the next batch and ship roasted-fresh
                by <span className="text-cream-100 font-semibold">{delivery}</span>. A
                confirmation is on its way to your inbox.
              </p>

              <div className="mt-6 w-full border border-line rounded-lg bg-bark-900/70 p-4 text-left">
                {snapshot.map(({ product, qty }) => (
                  <div key={product.id} className="flex justify-between py-1.5 text-[13px]">
                    <span className="text-cream-300">
                      {product.name} <span className="text-faint">×{qty}</span>
                    </span>
                    <span className="font-mono text-cream-100">
                      {formatPrice(product.price * qty)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-baseline pt-2 mt-1 border-t border-dashed border-bark-500">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                    Paid · simulated
                  </span>
                  <span className="font-mono text-lg text-caramel-300">{formatPrice(snapTotal)}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-7 flex items-center gap-3 bg-caramel-400 hover:bg-caramel-300 text-bark-950 font-bold text-sm px-7 py-3.5 rounded-full transition-all active:scale-95"
              >
                Back to the shelf
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
