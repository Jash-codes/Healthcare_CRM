import { useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Mail, Stethoscope } from 'lucide-react';
import { defaultSettings } from '../data/store';

const DEMO_EMAIL = 'admin@medicareplus.com';
const DEMO_PASSWORD = 'demo1234';
const AUTH_KEY = 'hcrm.auth';

export default function Login() {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (localStorage.getItem(AUTH_KEY) === 'true') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      navigate('/dashboard', { replace: true, state: { from: location } });
    } else {
      setError('Invalid credentials. Use the demo login shown below.');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-teal-900 lg:flex lg:flex-col lg:justify-between p-12">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Stethoscope className="h-6 w-6 text-white" />
          </span>
          <span className="text-xl font-bold text-white">{defaultSettings.clinicName}</span>
        </div>
        <div className="relative">
          <h1 className="max-w-md text-4xl font-bold leading-tight text-white">
            Everything your clinic needs, in one calm dashboard.
          </h1>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-primary-100">
            Patients, doctors, appointments, and billing — beautifully organized so your team can focus on care.
          </p>
        </div>
        <p className="text-sm text-primary-200">© 2026 {defaultSettings.clinicName}. All rights reserved.</p>
      </div>

      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
              <Stethoscope className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-bold text-slate-900">{defaultSettings.clinicName}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage your clinic.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  placeholder="you@clinic.com"
                  required
                />
              </div>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Password</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  placeholder="••••••••"
                  required
                />
              </div>
            </label>

            {error && (
              <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 ring-1 ring-rose-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-primary-100 bg-primary-50/70 px-5 py-4">
            <p className="text-sm font-semibold text-primary-800">Demo credentials</p>
            <p className="mt-1 text-sm text-primary-700">
              Email: {DEMO_EMAIL} · Password: {DEMO_PASSWORD}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
