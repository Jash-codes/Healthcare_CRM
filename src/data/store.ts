import { useCallback, useEffect, useState } from 'react';
import type { Appointment, ClinicSettings, Doctor, Invoice, Patient } from '../types';
import { seedAppointments, seedDoctors, seedInvoices, seedPatients } from './seed';

const KEYS = {
  patients: 'hcrm.patients',
  doctors: 'hcrm.doctors',
  appointments: 'hcrm.appointments',
  invoices: 'hcrm.invoices',
  settings: 'hcrm.settings',
} as const;

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode) — keep working in memory
  }
}

export const defaultSettings: ClinicSettings = {
  clinicName: 'Medicare Plus Clinic',
  tagline: 'Compassionate care, every day',
  email: 'contact@medicareplus.com',
  phone: '(555) 000-1000',
  address: '250 Wellness Boulevard, Springfield, IL 62704',
  adminName: 'Jessica Monroe',
  adminRole: 'Clinic Administrator',
  notifyAppointments: true,
  notifyCancellations: true,
  notifyBilling: true,
  weeklyDigest: false,
};

export function useCollection<T>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(() => load(key, seed));

  useEffect(() => {
    save(key, items);
  }, [key, items]);

  const add = useCallback((item: T) => setItems((prev) => [item, ...prev]), []);
  const update = useCallback(
    (updated: T, idOf: (item: T) => string) =>
      setItems((prev) => prev.map((it) => (idOf(it) === idOf(updated) ? updated : it))),
    []
  );
  const remove = useCallback(
    (id: string, idOf: (item: T) => string) => setItems((prev) => prev.filter((it) => idOf(it) !== id)),
    []
  );

  return { items, add, update, remove };
}

export function usePatients() {
  return useCollection<Patient>(KEYS.patients, seedPatients);
}
export function useDoctors() {
  return useCollection<Doctor>(KEYS.doctors, seedDoctors);
}
export function useAppointments() {
  return useCollection<Appointment>(KEYS.appointments, seedAppointments);
}
export function useInvoices() {
  return useCollection<Invoice>(KEYS.invoices, seedInvoices);
}

export function useSettings() {
  const [settings, setSettings] = useState<ClinicSettings>(() => load(KEYS.settings, defaultSettings));
  useEffect(() => {
    save(KEYS.settings, settings);
  }, [settings]);
  const updateSettings = useCallback(
    (patch: Partial<ClinicSettings>) => setSettings((prev) => ({ ...prev, ...patch })),
    []
  );
  return { settings, updateSettings };
}
