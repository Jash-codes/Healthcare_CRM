import { useMemo, useState } from 'react';
import { FilePlus2, ReceiptText } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Badge, EmptyState, Field, inputClass, Modal, statusColor } from '../components/ui';
import { useInvoices, usePatients } from '../data/store';
import type { Invoice, PaymentStatus } from '../types';

const todayISO = new Date().toISOString().slice(0, 10);

export default function Billing() {
  const { items: invoices, add } = useInvoices();
  const { items: patients } = usePatients();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    patientId: '',
    amount: '',
    items: '',
    status: 'Pending' as PaymentStatus,
  });

  const patientName = (id: string) => patients.find((p) => p.id === id)?.name ?? 'Unknown patient';

  const sorted = useMemo(
    () => [...invoices].sort((a, b) => (a.paymentDate < b.paymentDate ? 1 : -1)),
    [invoices]
  );

  const revenueByDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const inv of invoices) {
      if (inv.status === 'Paid') map.set(inv.paymentDate, (map.get(inv.paymentDate) ?? 0) + inv.amount);
    }
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7)
      .map(([date, total]) => ({ date: date.slice(5), revenue: total }));
  }, [invoices]);

  const totalPaid = invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status !== 'Paid').reduce((s, i) => s + i.amount, 0);

  const openCreate = () => {
    setForm({ patientId: patients[0]?.id ?? '', amount: '', items: '', status: 'Pending' });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextNum = 400 + invoices.length + 1;
    const inv: Invoice = {
      id: `I-${nextNum}`,
      number: `INV-2026-${String(nextNum + 40).padStart(3, '0')}`,
      patientId: form.patientId,
      amount: Number(form.amount) || 0,
      paymentDate: todayISO,
      status: form.status,
      items: form.items,
    };
    add(inv);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Billing</h1>
          <p className="mt-1 text-sm text-slate-500">{invoices.length} recent invoices</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
        >
          <FilePlus2 className="h-4 w-4" />
          Create invoice
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-card lg:col-span-2">
          <h2 className="text-base font-bold text-slate-900">Revenue collected</h2>
          <p className="mt-0.5 text-xs text-slate-400">Paid invoices, most recent payment dates</p>
          <div className="mt-4 h-56">
            {revenueByDay.length === 0 ? (
              <EmptyState message="No paid invoices yet." />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByDay}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="revenue" fill="#24ada8" radius={[6, 6, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white shadow-card">
            <p className="text-sm font-medium text-primary-100">Collected this period</p>
            <p className="mt-2 text-3xl font-bold">${totalPaid.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-card">
            <p className="text-sm font-medium text-slate-500">Outstanding balance</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">${outstanding.toLocaleString()}</p>
            <p className="mt-2 text-xs text-slate-400">
              {invoices.filter((i) => i.status !== 'Paid').length} unpaid invoices
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-card">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <ReceiptText className="h-5 w-5 text-primary-600" />
          <h2 className="text-base font-bold text-slate-900">Recent invoices</h2>
        </div>
        {sorted.length === 0 ? (
          <div className="p-6">
            <EmptyState message="No invoices yet. Create one to get started." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Payment date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sorted.map((inv) => (
                  <tr key={inv.id} className="transition hover:bg-slate-50/70">
                    <td className="px-6 py-4 font-semibold text-slate-800">{inv.number}</td>
                    <td className="px-6 py-4 text-slate-600">{patientName(inv.patientId)}</td>
                    <td className="px-6 py-4 text-slate-600">{inv.items}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">${inv.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600">{inv.paymentDate}</td>
                    <td className="px-6 py-4"><Badge color={statusColor[inv.status]}>{inv.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create invoice" wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Patient">
              <select required value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} className={inputClass}>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                ))}
              </select>
            </Field>
            <Field label="Amount (USD)">
              <input required type="number" min="1" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={inputClass} placeholder="150.00" />
            </Field>
            <Field label="Payment status">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PaymentStatus })} className={inputClass}>
                {['Paid', 'Pending', 'Overdue'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Payment date">
              <input type="text" value={todayISO} readOnly className={`${inputClass} bg-slate-50 text-slate-500`} />
            </Field>
          </div>
          <Field label="Items / services">
            <input required value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} className={inputClass} placeholder="Consultation, blood panel…" />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
              Create invoice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
