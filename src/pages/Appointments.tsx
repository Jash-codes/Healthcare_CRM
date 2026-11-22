import { useMemo, useState } from 'react';
import { CalendarDays, CalendarPlus, Clock, Stethoscope, UserRound, XCircle } from 'lucide-react';
import { Badge, EmptyState, Field, inputClass, Modal, statusColor } from '../components/ui';
import { useAppointments, useDoctors, usePatients } from '../data/store';
import type { Appointment, AppointmentStatus } from '../types';

const todayISO = new Date().toISOString().slice(0, 10);

const emptyForm = {
  patientId: '',
  doctorId: '',
  date: todayISO,
  time: '09:00',
  reason: '',
};

export default function Appointments() {
  const { items: appointments, add, update } = useAppointments();
  const { items: patients } = usePatients();
  const { items: doctors } = useDoctors();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [confirmCancel, setConfirmCancel] = useState<Appointment | null>(null);

  const patientName = (id: string) => patients.find((p) => p.id === id)?.name ?? 'Unknown patient';
  const doctorName = (id: string) => doctors.find((d) => d.id === id)?.name ?? 'Unknown doctor';

  const upcoming = useMemo(
    () =>
      [...appointments]
        .filter((a) => a.date >= todayISO && a.status !== 'Cancelled')
        .sort((a, b) => (a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date))),
    [appointments]
  );

  const openSchedule = () => {
    setForm({
      ...emptyForm,
      patientId: patients[0]?.id ?? '',
      doctorId: doctors[0]?.id ?? '',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextNum = 300 + appointments.length + 1;
    add({
      id: `A-${nextNum}`,
      patientId: form.patientId,
      doctorId: form.doctorId,
      date: form.date,
      time: form.time,
      reason: form.reason,
      status: 'Scheduled',
    });
    setModalOpen(false);
  };

  const setStatus = (a: Appointment, status: AppointmentStatus) =>
    update({ ...a, status }, (x) => x.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Appointments</h1>
          <p className="mt-1 text-sm text-slate-500">{upcoming.length} upcoming visits</p>
        </div>
        <button
          onClick={openSchedule}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
        >
          <CalendarPlus className="h-4 w-4" />
          Schedule appointment
        </button>
      </div>

      <div className="rounded-2xl bg-white shadow-card">
        {upcoming.length === 0 ? (
          <div className="p-6">
            <EmptyState message="No upcoming appointments. Schedule one to get started." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-4">Date & time</th>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {upcoming.map((a) => (
                  <tr key={a.id} className="transition hover:bg-slate-50/70">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                          <CalendarDays className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-semibold text-slate-800">{a.date === todayISO ? 'Today' : a.date}</p>
                          <p className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="h-3 w-3" />
                            {a.time}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="flex items-center gap-2 font-semibold text-slate-800">
                        <UserRound className="h-4 w-4 text-slate-300" />
                        {patientName(a.patientId)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="flex items-center gap-2 text-slate-600">
                        <Stethoscope className="h-4 w-4 text-slate-300" />
                        {doctorName(a.doctorId)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{a.reason}</td>
                    <td className="px-6 py-4"><Badge color={statusColor[a.status]}>{a.status}</Badge></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {a.status !== 'Completed' && (
                          <button
                            onClick={() => setStatus(a, 'Completed')}
                            className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100"
                          >
                            Mark completed
                          </button>
                        )}
                        {a.status !== 'Confirmed' && a.status !== 'Completed' && (
                          <button
                            onClick={() => setStatus(a, 'Confirmed')}
                            className="rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 ring-1 ring-primary-200 transition hover:bg-primary-100"
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          onClick={() => setConfirmCancel(a)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                          title="Cancel appointment"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Schedule appointment" wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Patient">
              <select required value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} className={inputClass}>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                ))}
              </select>
            </Field>
            <Field label="Doctor">
              <select required value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })} className={inputClass}>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} — {d.specialization}</option>
                ))}
              </select>
            </Field>
            <Field label="Date">
              <input required type="date" min={todayISO} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Time">
              <input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass} />
            </Field>
          </div>
          <Field label="Reason for visit">
            <input required value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className={inputClass} placeholder="Annual checkup, follow-up…" />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
              Schedule
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!confirmCancel} onClose={() => setConfirmCancel(null)} title="Cancel appointment">
        <p className="text-sm text-slate-600">
          Cancel the appointment for <span className="font-semibold text-slate-900">{confirmCancel ? patientName(confirmCancel.patientId) : ''}</span> on {confirmCancel?.date} at {confirmCancel?.time}?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setConfirmCancel(null)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
            Keep appointment
          </button>
          <button
            onClick={() => {
              if (confirmCancel) setStatus(confirmCancel, 'Cancelled');
              setConfirmCancel(null);
            }}
            className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
          >
            Cancel appointment
          </button>
        </div>
      </Modal>
    </div>
  );
}
