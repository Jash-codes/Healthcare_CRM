import { X } from 'lucide-react';
import type { ReactNode } from 'react';

const badgeStyles: Record<string, string> = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  blue: 'bg-primary-50 text-primary-700 ring-primary-200',
  teal: 'bg-teal-50 text-teal-700 ring-teal-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  red: 'bg-rose-50 text-rose-700 ring-rose-200',
  gray: 'bg-slate-100 text-slate-600 ring-slate-200',
};

export function Badge({ color, children }: { color: keyof typeof badgeStyles; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${badgeStyles[color]}`}>
      {children}
    </span>
  );
}

export const statusColor: Record<string, 'green' | 'blue' | 'teal' | 'amber' | 'red' | 'gray'> = {
  Completed: 'green',
  Confirmed: 'blue',
  Scheduled: 'teal',
  Cancelled: 'red',
  Paid: 'green',
  Pending: 'amber',
  Overdue: 'red',
  Available: 'green',
  'In Surgery': 'amber',
  'On Leave': 'gray',
  'Off Duty': 'gray',
};

export function Modal({
  open,
  title,
  onClose,
  children,
  wide = false,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100';

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center">
      <p className="text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
}
