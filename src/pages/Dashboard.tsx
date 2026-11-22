import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CalendarDays,
  CalendarPlus,
  CircleDollarSign,
  UserPlus,
  Users,
  UsersRound,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge, statusColor } from '../components/ui';
import { useAppointments, useDoctors, usePatients } from '../data/store';
import { weeklyAppointmentsSeed } from '../data/seed';

const statusOverviewSeed = [
  { name: 'Completed', value: 46, color: '#10b981' },
  { name: 'Confirmed', value: 24, color: '#1b7ef5' },
  { name: 'Scheduled', value: 18, color: '#24ada8' },
  { name: 'Cancelled', value: 7, color: '#f43f5e' },
];

const todayISO = new Date().toISOString().slice(0, 10);

function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  delta: string;
  icon: typeof Users;
  accent: string;
}) {
  return (
    <div className="group rounded-2xl bg-white p-6 shadow-card transition hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent} transition group-hover:scale-105`}>
          <Icon className="h-5.5 w-5.5 text-white" />
        </span>
      </div>
      <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600">
        <ArrowUpRight className="h-3.5 w-3.5" />
        {delta}
        <span className="font-normal text-slate-400">vs last month</span>
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { items: patients } = usePatients();
  const { items: doctors } = useDoctors();
  const { items: appointments } = useAppointments();

  const todaysAppointments = appointments.filter((a) => a.date === todayISO);
  const monthlyRevenue = 48250;

  const recentPatients = [...patients]
    .sort((a, b) => (a.registeredDate < b.registeredDate ? 1 : -1))
    .slice(0, 5);

  const upcoming = [...appointments]
    .filter((a) => a.date >= todayISO && a.status !== 'Cancelled')
    .sort((a, b) => (a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)))
    .slice(0, 5);

  const patientName = (id: string) => patients.find((p) => p.id === id)?.name ?? 'Unknown patient';
  const doctorName = (id: string) => doctors.find((d) => d.id === id)?.name ?? 'Unknown doctor';

  const initial = (name: string) =>
    name
      .replace(/^Dr\.\s*/, '')
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">A quick overview of your clinic today.</p>
        </div>
        <Link
          to="/appointments"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
        >
          <CalendarPlus className="h-4 w-4" />
          New appointment
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Patients" value={String(patients.length)} delta="+12%" icon={Users} accent="bg-primary-600" />
        <StatCard label="Total Doctors" value={String(doctors.length)} delta="+1" icon={UsersRound} accent="bg-teal-500" />
        <StatCard label="Today's Appointments" value={String(todaysAppointments.length)} delta="+3" icon={CalendarDays} accent="bg-indigo-500" />
        <StatCard label="Monthly Revenue" value={`$${monthlyRevenue.toLocaleString()}`} delta="+8.2%" icon={CircleDollarSign} accent="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-card xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Weekly appointments</h2>
              <p className="mt-0.5 text-xs text-slate-400">Bookings vs completed this week</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary-500" />Booked</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-teal-400" />Completed</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAppointmentsSeed} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={28} />
                <Tooltip cursor={{ fill: 'rgba(27, 126, 245, 0.06)' }} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(16,42,67,0.08)' }} />
                <Bar dataKey="appointments" name="Booked" fill="#1b7ef5" radius={[6, 6, 0, 0]} maxBarSize={22} />
                <Bar dataKey="completed" name="Completed" fill="#40cabf" radius={[6, 6, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-slate-900">Appointment status</h2>
          <p className="mt-0.5 text-xs text-slate-400">Distribution across all visits</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statusOverviewSeed} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  {statusOverviewSeed.map((s) => (
                    <linearGradient key={s.name} id={`grad-${s.name}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={s.color} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="value" name="Visits" stroke="#1b7ef5" strokeWidth={2} fill="url(#grad-Completed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {statusOverviewSeed.map((s) => (
              <div key={s.name} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="truncate text-xs font-medium text-slate-600">{s.name}</span>
                <span className="ml-auto text-xs font-bold text-slate-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-2xl bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-bold text-slate-900">Recent patient registrations</h2>
            <Link to="/patients" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {recentPatients.map((p) => (
              <li key={p.id} className="flex items-center gap-4 px-6 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary-700">
                  {initial(p.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-400">Registered {p.registeredDate}</p>
                </div>
                <Badge color="teal">{p.bloodGroup}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-base font-bold text-slate-900">Upcoming appointments</h2>
            <Link to="/appointments" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {upcoming.map((a) => (
              <li key={a.id} className="flex items-center gap-4 px-6 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-700">
                  {a.time}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{patientName(a.patientId)}</p>
                  <p className="truncate text-xs text-slate-400">
                    {doctorName(a.doctorId)} · {a.reason}
                  </p>
                </div>
                <Badge color={statusColor[a.status]}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-teal-600 px-6 py-5 text-white shadow-card">
        <UserPlus className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">
          {patients.length} patients trusted us with their care this quarter. Keep it up.
        </p>
      </div>
    </div>
  );
}
