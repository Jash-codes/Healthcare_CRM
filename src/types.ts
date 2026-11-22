export type Gender = 'Male' | 'Female' | 'Other';

export type AppointmentStatus = 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';

export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue';

export type AvailabilityStatus = 'Available' | 'In Surgery' | 'On Leave' | 'Off Duty';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  email: string;
  bloodGroup: string;
  address: string;
  registeredDate: string;
  lastVisit: string;
  notes: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  phone: string;
  email: string;
  availability: AvailabilityStatus;
  experience: number;
  rating: number;
  color: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
}

export interface Invoice {
  id: string;
  number: string;
  patientId: string;
  amount: number;
  paymentDate: string;
  status: PaymentStatus;
  items: string;
}

export interface ClinicSettings {
  clinicName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  adminName: string;
  adminRole: string;
  notifyAppointments: boolean;
  notifyCancellations: boolean;
  notifyBilling: boolean;
  weeklyDigest: boolean;
}
