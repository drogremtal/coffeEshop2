import { useState } from "react";
import { ArrowIcon, BeanIcon, CupIcon } from "./icons";

interface FooterProps {
  onToast: (msg: string) => void;
}

export default function Footer({ onToast }: FooterProps) {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      onToast("That email looks a little under-extracted — try again.");
      return;
    }
    setEmail("");
    onToast("You're on the First Pour list. The next roast is yours early.");
  };

  return (
    <footer id="visit" className="relative border-t border-line bg-bark-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-caramel-400">
                <CupIcon className="w-10 h-10" strokeWidth={1.4} />
              </span>
              <div className="leading-none">
                <p className="font-display text-2xl font-semibold text-cream-100">
                  Ember <span className="text-caramel-400">&amp;</span> Oak
                </p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.34em] text-faint">
                  ROASTING CO.
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-cream-300 max-w-xs">
              A two-drum roastery in a former woodworking shop. We roast loud,
              cup louder, and ship everything within two days of the drop.
            </p>
            <div className="mt-6 font-mono text-[11px] leading-loose text-cream-500">
              <p className="text-[9.5px] uppercase tracking-[0.24em] text-faint mb-2">
                Café hours
              </p>
              <p>Tue – Fri <span className="text-faint">·</span> 7:00 — 17:00</p>
              <p>Sat – Sun <span className="text-faint">·</span> 8:00 — 16:00</p>
              <p className="text-faint">Monday the drum rests</p>
            </div>
          </div>

          {/* visit */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-caramel-400">
              Find us
            </p>
            <address className="mt-5 not-italic text-sm leading-loose text-cream-300">
              2214 NW Quimby Street
              <br />
              Portland, Oregon 97210
              <br />
              <a
                href="mailto:hello@emberandoak.coffee"
                className="text-caramel-300 hover:text-caramel-400 border-b border-caramel-600/40 transition-colors"
              >
                hello@emberandoak.coffee
              </a>
              <br />
              <a href="tel:+15035550182" className="hover:text-cream-100 transition-colors">
                (503) 555-0182
              </a>
            </address>
            <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              <BeanIcon className="w-3.5 h-3.5 text-caramel-500" />
              Public cuppings · Saturdays 10:00
            </p>
          </div>

          {/* newsletter */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-caramel-400">
              First Pour Club
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-cream-100 leading-snug">
              New lots land Thursday. Members pour first.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream-300">
              One email a week — roast log, allocation counts, and a 24-hour
              head start on small lots like Cloud Forest.
            </p>
            <form onSubmit={subscribe} className="mt-5 flex gap-2">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@slowmornings.com"
                className="flex-1 min-w-0 bg-bark-800 border border-line rounded-full px-5 py-3 text-sm text-cream-100 placeholder:text-faint focus:outline-none focus:border-caramel-500 focus:ring-1 focus:ring-caramel-500/40 transition-all"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="group flex items-center gap-2 bg-caramel-400 hover:bg-caramel-300 text-bark-950 font-bold text-sm px-5 sm:px-6 rounded-full transition-all active:scale-95"
              >
                Join
                <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint">
            © 2026 Ember &amp; Oak Roasting Co.
          </p>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint">
            Demo storefront — no real orders, only real cravings
          </p>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint">
            Roasted with intent in PDX
          </p>
        </div>
      </div>
    </footer>
  );
}
