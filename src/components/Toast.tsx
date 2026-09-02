import { BeanIcon } from "./icons";

export interface ToastData {
  id: number;
  msg: string;
}

export default function Toast({ toast }: { toast: ToastData | null }) {
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      className="toast-in fixed bottom-6 left-1/2 z-[70] flex items-center gap-3 bg-bark-800 border border-caramel-600/50 rounded-full pl-3.5 pr-5 py-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] max-w-[92vw]"
      role="status"
      aria-live="polite"
    >
      <span className="w-7 h-7 shrink-0 rounded-full bg-caramel-400 flex items-center justify-center text-bark-950">
        <BeanIcon className="w-4 h-4" strokeWidth={2} />
      </span>
      <p className="text-sm text-cream-100 leading-snug">{toast.msg}</p>
    </div>
  );
}
