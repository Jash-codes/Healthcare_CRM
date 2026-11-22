import { useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Stethoscope,
  UserRound,
  Users,
  UsersRound,
  X,
} from 'lucide-react';
import { defaultSettings, useSettings } from '../data/store';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/doctors', label: 'Doctors', icon: UsersRound },
  { to: '/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/billing', label: 'Billing', icon: CreditCard },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const AUTH_KEY = 'hcrm.auth';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { settings } = useSettings();

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return navItems.filter((n) => n.label.toLowerCase().includes(q));
  }, [query]);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate('/', { replace: true });
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-6 py-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-teal-500 shadow-card">
          <Stethoscope className="h-5 w-5 text-white" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">{settings.clinicName}</p>
          <p className="truncate text-xs text-slate-400">{settings.tagline}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-primary-50 hover:text-primary-700'
              }`
            }
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut className="h-4.5 w-4.5" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-100 bg-white lg:block">
        {sidebar}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-6 rounded-full p-2 text-slate-400 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-100 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100"
            />
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-12 overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-card-hover">
                {searchResults.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setQuery('')}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 transition hover:bg-primary-50 hover:text-primary-700"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-100"
            >
              <span className="hidden text-right sm:block">
                <span className="block text-sm font-semibold text-slate-800">{settings.adminName}</span>
                <span className="block text-xs text-slate-400">{settings.adminRole}</span>
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-teal-500 text-sm font-bold text-white">
                <UserRound className="h-4.5 w-4.5" />
              </span>
            </Link>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
