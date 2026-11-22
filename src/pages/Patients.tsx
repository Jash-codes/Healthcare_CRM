import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Plus, Search, Trash2, UserRound } from 'lucide-react';
import { Badge, EmptyState, Field, inputClass, Modal, statusColor } from '../components/ui';
import { useAppointments, useDoctors, usePatients } from '../data/store';
import type { Gender, Patient } from '../types';

const emptyForm = {
  name: '',
  age: '',
  gender: 'Female' as Gender,
  phone: '',
  email: '',
  bloodGroup: 'O+',
  address: '',
  notes: '',
};

export default function Patients() {
  const { items: patients, add, update, remove } = usePatients();
  const { items: doctors } = useDoctors();
  const { items: appointments } = useAppointments();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Patient | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [profile, setProfile] = useState<Patient | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Patient | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return patients.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
  }, [patients, search]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (p: Patient) => {
    setEditing(p);
    setForm({
      name: p.name,
      age: String(p.age),
      gender: p.gender,
      phone: p.phone,
      email: p.email,
      bloodGroup: p.bloodGroup,
      address: p.address,
      notes: p.notes,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    if (editing) {
      update(
        {
          ...editing,
          ...form,
          age: Number(form.age) || 0,
        },
        (p) => p.id
      );
    } else {
      const nextNum = 1000 + patients.length + 1;
      add({
        id: `P-${nextNum}`,
        name: form.name,
        age: Number(form.age) || 0,
        gender: form.gender,
        phone: form.phone,
        email: form.email,
        bloodGroup: form.bloodGroup,
        address: form.address,
        notes: form.notes,
        registeredDate: today,
        lastVisit: today,
      });
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (confirmDelete) remove(confirmDelete.id, (p) => p.id);
    setConfirmDelete(null);
  };

  const patientAppointments = profile
    ? appointments.filter((a) => a.patientId === profile.id).sort((a, b) => b.date.localeCompare(a.date))
    : [];
  const doctorName = (id: string) => doctors.find((d) => d.id === id)?.name ?? 'Unknown doctor';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Patients</h1>
          <p className="mt-1 text-sm text-slate-500">{patients.length} registered patients</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add patient
        </button>
      </div>

      <div className="rounded-2xl bg-white shadow-card">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or ID…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState message="No patients match your search." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Age / Gender</th>
                  <th className="px-6 py-4">Blood</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="transition hover:bg-slate-50/70">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                          {p.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-800">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{p.age} · {p.gender}</td>
                    <td className="px-6 py-4"><Badge color="teal">{p.bloodGroup}</Badge></td>
                    <td className="px-6 py-4 text-slate-600">{p.phone}</td>
                    <td className="px-6 py-4 text-slate-600">{p.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setProfile(p)} className="rounded-lg p-2 text-slate-400 transition hover:bg-primary-50 hover:text-primary-600" title="View profile">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => openEdit(p)} className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => setConfirmDelete(p)} className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600" title="Delete">
                          <Trash2 className="h-4 w-4" />
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit patient' : 'Add new patient'} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Jane Doe" />
            </Field>
            <Field label="Age">
              <input required type="number" min="0" max="120" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className={inputClass} placeholder="34" />
            </Field>
            <Field label="Gender">
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as Gender })} className={inputClass}>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Blood group">
              <select value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} className={inputClass}>
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((b) => <option key={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Phone">
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="(555) 123-4567" />
            </Field>
            <Field label="Email">
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="jane@example.com" />
            </Field>
          </div>
          <Field label="Address">
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} placeholder="123 Main Street, Springfield" />
          </Field>
          <Field label="Medical notes">
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className={inputClass} placeholder="Allergies, conditions, ongoing treatments…" />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
              {editing ? 'Save changes' : 'Add patient'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!profile} onClose={() => setProfile(null)} title="Patient profile" wide>
        {profile && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-teal-500 text-xl font-bold text-white">
                {profile.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
              </span>
              <div>
                <h4 className="text-xl font-bold text-slate-900">{profile.name}</h4>
                <p className="text-sm text-slate-500">{profile.id} · Joined {profile.registeredDate}</p>
              </div>
              <Badge color="teal">{profile.gender}, {profile.age}</Badge>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ['Phone', profile.phone],
                ['Email', profile.email],
                ['Blood group', profile.bloodGroup],
                ['Last visit', profile.lastVisit],
                ['Address', profile.address],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-800">{value || '—'}</p>
                </div>
              ))}
            </div>

            {profile.notes && (
              <div className="rounded-xl border border-primary-100 bg-primary-50/60 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-primary-600">Medical notes</p>
                <p className="mt-1 text-sm text-slate-700">{profile.notes}</p>
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-bold text-slate-900">Appointment history</p>
              {patientAppointments.length === 0 ? (
                <EmptyState message="No appointments recorded for this patient." />
              ) : (
                <ul className="space-y-2">
                  {patientAppointments.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3">
                      <UserRound className="h-4 w-4 shrink-0 text-slate-400" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">{a.reason}</p>
                        <p className="text-xs text-slate-400">{a.date} at {a.time} · {doctorName(a.doctorId)}</p>
                      </div>
                      <Badge color={statusColor[a.status]}>{a.status}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete patient">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <span className="font-semibold text-slate-900">{confirmDelete?.name}</span>? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setConfirmDelete(null)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
            Cancel
          </button>
          <button onClick={handleDelete} className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
