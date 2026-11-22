import { useState } from 'react';
import { Bell, Building2, Check, Save, ShieldCheck, UserCog } from 'lucide-react';
import { Field, inputClass } from '../components/ui';
import { useSettings } from '../data/store';

function Toggle({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 px-4 py-3.5">
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-primary-600' : 'bg-slate-300'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const [form, setForm] = useState(settings);
  const [savedClinic, setSavedClinic] = useState(false);
  const [savedAdmin, setSavedAdmin] = useState(false);

  const flash = (setter: (v: boolean) => void) => {
    setter(true);
    window.setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your clinic profile and preferences.</p>
      </div>

      <section className="rounded-2xl bg-white shadow-card">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
            <Building2 className="h-5 w-5 text-primary-600" />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-900">Clinic details</h2>
            <p className="text-xs text-slate-400">Shown across the dashboard and invoices</p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateSettings(form);
            flash(setSavedClinic);
          }}
          className="space-y-4 px-6 py-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Clinic name">
              <input required value={form.clinicName} onChange={(e) => setForm({ ...form, clinicName: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Tagline">
              <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Contact email">
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Phone">
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            </Field>
          </div>
          <Field label="Address">
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} />
          </Field>
          <div className="flex items-center justify-end gap-3 pt-1">
            {savedClinic && (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <Check className="h-4 w-4" /> Saved
              </span>
            )}
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
              <Save className="h-4 w-4" />
              Save changes
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl bg-white shadow-card">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
            <UserCog className="h-5 w-5 text-teal-600" />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-900">Admin profile</h2>
            <p className="text-xs text-slate-400">Your account shown in the top bar</p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateSettings({ adminName: form.adminName, adminRole: form.adminRole });
            flash(setSavedAdmin);
          }}
          className="space-y-4 px-6 py-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input required value={form.adminName} onChange={(e) => setForm({ ...form, adminName: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Role">
              <input required value={form.adminRole} onChange={(e) => setForm({ ...form, adminRole: e.target.value })} className={inputClass} />
            </Field>
          </div>
          <div className="flex items-center justify-end gap-3 pt-1">
            {savedAdmin && (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <Check className="h-4 w-4" /> Saved
              </span>
            )}
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
              <Save className="h-4 w-4" />
              Save profile
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl bg-white shadow-card">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
            <Bell className="h-5 w-5 text-amber-600" />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-900">Notifications</h2>
            <p className="text-xs text-slate-400">Choose what alerts the team receives</p>
          </div>
        </div>
        <div className="space-y-3 px-6 py-5">
          <Toggle
            checked={settings.notifyAppointments}
            onChange={(v) => updateSettings({ notifyAppointments: v })}
            title="New appointment bookings"
            description="Alert when a patient schedules a visit"
          />
          <Toggle
            checked={settings.notifyCancellations}
            onChange={(v) => updateSettings({ notifyCancellations: v })}
            title="Cancellations"
            description="Alert when an appointment is cancelled"
          />
          <Toggle
            checked={settings.notifyBilling}
            onChange={(v) => updateSettings({ notifyBilling: v })}
            title="Billing events"
            description="Alert for new invoices and overdue payments"
          />
          <Toggle
            checked={settings.weeklyDigest}
            onChange={(v) => updateSettings({ weeklyDigest: v })}
            title="Weekly digest"
            description="Summary email of clinic activity every Monday"
          />
          <p className="flex items-center gap-2 pt-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Preferences are saved automatically on this device.
          </p>
        </div>
      </section>
    </div>
  );
}
