import { useState } from 'react';
import { Mail, Pencil, Phone, Plus, Star, Stethoscope } from 'lucide-react';
import { Badge, Field, inputClass, Modal, statusColor } from '../components/ui';
import { useDoctors } from '../data/store';
import type { AvailabilityStatus, Doctor } from '../types';

const emptyForm = {
  name: '',
  specialization: '',
  department: '',
  phone: '',
  email: '',
  availability: 'Available' as AvailabilityStatus,
  experience: '',
};

const accents = ['bg-primary-500', 'bg-teal-500', 'bg-amber-500', 'bg-rose-500', 'bg-emerald-500', 'bg-sky-500'];

export default function Doctors() {
  const { items: doctors, add, update } = useDoctors();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (d: Doctor) => {
    setEditing(d);
    setForm({
      name: d.name,
      specialization: d.specialization,
      department: d.department,
      phone: d.phone,
      email: d.email,
      availability: d.availability,
      experience: String(d.experience),
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      update({ ...editing, ...form, experience: Number(form.experience) || 0 }, (d) => d.id);
    } else {
      const nextNum = 200 + doctors.length + 1;
      add({
        id: `D-${nextNum}`,
        ...form,
        experience: Number(form.experience) || 0,
        rating: 4.5,
        color: accents[doctors.length % accents.length],
      });
    }
    setModalOpen(false);
  };

  const initials = (name: string) =>
    name.replace(/^Dr\.\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Doctors</h1>
          <p className="mt-1 text-sm text-slate-500">{doctors.length} specialists on staff</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add doctor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {doctors.map((d) => (
          <div key={d.id} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-card transition hover:shadow-card-hover">
            <div className={`absolute inset-x-0 top-0 h-1.5 ${d.color}`} />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white ${d.color}`}>
                  {initials(d.name)}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{d.name}</h3>
                  <p className="text-sm text-slate-500">{d.specialization}</p>
                </div>
              </div>
              <button onClick={() => openEdit(d)} className="rounded-lg p-2 text-slate-300 transition hover:bg-amber-50 hover:text-amber-600" title="Edit doctor">
                <Pencil className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-2.5 text-sm">
              <p className="flex items-center gap-2.5 text-slate-600">
                <Stethoscope className="h-4 w-4 shrink-0 text-slate-400" />
                {d.department} · {d.experience} yrs experience
              </p>
              <p className="flex items-center gap-2.5 text-slate-600">
                <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                {d.phone}
              </p>
              <p className="flex items-center gap-2.5 truncate text-slate-600">
                <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                {d.email}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <Badge color={statusColor[d.availability]}>{d.availability}</Badge>
              <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {d.rating.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit doctor' : 'Add new doctor'} wide>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Dr. Jane Smith" />
            </Field>
            <Field label="Specialization">
              <input required value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className={inputClass} placeholder="Cardiologist" />
            </Field>
            <Field label="Department">
              <input required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inputClass} placeholder="Cardiology" />
            </Field>
            <Field label="Years of experience">
              <input required type="number" min="0" max="60" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className={inputClass} placeholder="10" />
            </Field>
            <Field label="Phone">
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="(555) 123-4567" />
            </Field>
            <Field label="Email">
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="dr.smith@clinic.com" />
            </Field>
          </div>
          <Field label="Availability status">
            <select value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value as AvailabilityStatus })} className={inputClass}>
              {['Available', 'In Surgery', 'On Leave', 'Off Duty'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
              {editing ? 'Save changes' : 'Add doctor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
