import { CheckCircle2, TrendingUp, Users, XCircle } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const monthlyAppointments = [
  { month: 'Jun', appointments: 142, revenue: 32400 },
  { month: 'Jul', appointments: 158, revenue: 35800 },
  { month: 'Aug', appointments: 171, revenue: 39100 },
  { month: 'Sep', appointments: 165, revenue: 41200 },
  { month: 'Oct', appointments: 188, revenue: 44600 },
  { month: 'Nov', appointments: 204, revenue: 48250 },
];

const completionRates = [
  { week: 'Week 1', completed: 88 },
  { week: 'Week 2', completed: 92 },
  { week: 'Week 3', completed: 85 },
  { week: 'Week 4', completed: 94 },
];

export default function Reports() {
  const completionAvg = Math.round(completionRates.reduce((s, r) => s + r.completed, 0) / completionRates.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">Simple analytics for the last six months.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Patient registrations</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
              <Users className="h-5 w-5 text-primary-600" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">16</p>
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" /> +4 this month
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Monthly appointments</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
              <CheckCircle2 className="h-5 w-5 text-teal-600" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">204</p>
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" /> +8.5% vs October
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Completion rate</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{completionAvg}%</p>
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" /> +2% vs last month
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-slate-900">Monthly appointments</h2>
          <p className="mt-0.5 text-xs text-slate-400">Total visits booked per month</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAppointments}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={32} />
                <Tooltip cursor={{ fill: 'rgba(27, 126, 245, 0.06)' }} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Bar dataKey="appointments" name="Appointments" fill="#1b7ef5" radius={[6, 6, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-slate-900">Revenue statistics</h2>
          <p className="mt-0.5 text-xs text-slate-400">Revenue collected per month (USD)</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAppointments}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#24ada8" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#24ada8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={44} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#24ada8" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-slate-900">Patient registrations</h2>
          <p className="mt-0.5 text-xs text-slate-400">New patients joining the clinic</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { month: 'Jun', registrations: 2 },
                  { month: 'Jul', registrations: 3 },
                  { month: 'Aug', registrations: 2 },
                  { month: 'Sep', registrations: 2 },
                  { month: 'Oct', registrations: 3 },
                  { month: 'Nov', registrations: 4 },
                ]}
              >
                <defs>
                  <linearGradient id="patGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b7ef5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1b7ef5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={28} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="registrations" name="New patients" stroke="#1b7ef5" strokeWidth={2.5} fill="url(#patGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-slate-900">Appointment completion rate</h2>
          <p className="mt-0.5 text-xs text-slate-400">Percentage of booked visits completed</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionRates} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="week" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={64} />
                <Tooltip formatter={(v) => [`${v}%`, 'Completed']} cursor={{ fill: 'rgba(36, 173, 168, 0.06)' }} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[0, 6, 6, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-teal-100 bg-teal-50/60 px-6 py-5">
        <XCircle className="h-5 w-5 shrink-0 text-teal-600" />
        <p className="text-sm text-teal-900">
          Cancellations remain under 10% for the fourth month in a row — keep sending those reminders.
        </p>
      </div>
    </div>
  );
}
