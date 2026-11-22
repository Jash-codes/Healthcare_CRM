import type { Appointment, Doctor, Invoice, Patient } from '../types';

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return iso(d);
};
const thisMonth = (day: number) => {
  const d = new Date(today.getFullYear(), today.getMonth(), day);
  return iso(d);
};

export const seedPatients: Patient[] = [
  { id: 'P-1001', name: 'Amara Okafor', age: 34, gender: 'Female', phone: '(555) 201-8834', email: 'amara.okafor@example.com', bloodGroup: 'O+', address: '42 Maple Grove, Springfield', registeredDate: '2025-11-04', lastVisit: '2026-11-12', notes: 'Mild seasonal allergies, responds well to antihistamines.' },
  { id: 'P-1002', name: 'Daniel Reyes', age: 58, gender: 'Male', phone: '(555) 318-2290', email: 'd.reyes@example.com', bloodGroup: 'A-', address: '18 Cedar Lane, Riverton', registeredDate: '2025-08-19', lastVisit: '2026-10-30', notes: 'Hypertension, monitors BP daily.' },
  { id: 'P-1003', name: 'Sofia Marchetti', age: 29, gender: 'Female', phone: '(555) 442-7710', email: 'sofia.m@example.com', bloodGroup: 'B+', address: '7 Birch Street, Lakeview', registeredDate: '2025-09-12', lastVisit: '2026-11-02', notes: 'Prenatal care, second trimester.' },
  { id: 'P-1004', name: 'Liam Chen', age: 7, gender: 'Male', phone: '(555) 555-0142', email: 'chen.family@example.com', bloodGroup: 'AB+', address: '90 Willow Way, Brookfield', registeredDate: '2024-05-23', lastVisit: '2026-09-18', notes: 'Annual pediatric checkups, no chronic conditions.' },
  { id: 'P-1005', name: 'Grace Adeyemi', age: 45, gender: 'Female', phone: '(555) 610-3327', email: 'g.adeyemi@example.com', bloodGroup: 'O-', address: '23 Aspen Court, Fairmont', registeredDate: '2025-02-14', lastVisit: '2026-11-08', notes: 'Type 2 diabetes, quarterly A1C reviews.' },
  { id: 'P-1006', name: 'Ethan Walsh', age: 62, gender: 'Male', phone: '(555) 720-9908', email: 'ethan.walsh@example.com', bloodGroup: 'A+', address: '105 Elm Avenue, Northgate', registeredDate: '2024-11-30', lastVisit: '2026-10-21', notes: 'Post-cardiac rehab, light exercise plan.' },
  { id: 'P-1007', name: 'Priya Nair', age: 31, gender: 'Female', phone: '(555) 833-4471', email: 'priya.nair@example.com', bloodGroup: 'B-', address: '66 Juniper Row, Eastvale', registeredDate: '2025-06-08', lastVisit: '2026-11-15', notes: 'Migraine history, keeping a trigger diary.' },
  { id: 'P-1008', name: 'Marcus Bell', age: 50, gender: 'Male', phone: '(555) 914-6620', email: 'm.bell@example.com', bloodGroup: 'O+', address: '31 Chestnut Blvd, Westhill', registeredDate: '2025-03-27', lastVisit: '2026-08-29', notes: 'Lower back pain, physiotherapy referral sent.' },
  { id: 'P-1009', name: 'Hana Sato', age: 26, gender: 'Female', phone: '(555) 045-1189', email: 'hana.sato@example.com', bloodGroup: 'A+', address: '12 Magnolia Drive, Cedar Park', registeredDate: '2025-12-01', lastVisit: '2026-10-11', notes: 'New patient intake complete, routine care.' },
  { id: 'P-1010', name: 'Oliver Brandt', age: 39, gender: 'Male', phone: '(555) 158-7734', email: 'o.brandt@example.com', bloodGroup: 'AB-', address: '88 Poplar Street, Kingsport', registeredDate: '2025-07-22', lastVisit: '2026-11-01', notes: 'Elevated cholesterol, dietary counseling started.' },
  { id: 'P-1011', name: 'Isabella Fontaine', age: 18, gender: 'Female', phone: '(555) 260-9915', email: 'bella.f@example.com', bloodGroup: 'O+', address: '5 Laurel Close, Ashford', registeredDate: '2025-10-05', lastVisit: '2026-09-04', notes: 'Sports physical cleared for track season.' },
  { id: 'P-1012', name: 'Noah Fitzgerald', age: 71, gender: 'Male', phone: '(555) 372-2208', email: 'n.fitzgerald@example.com', bloodGroup: 'A+', address: '140 Sycamore Road, Elmsworth', registeredDate: '2024-09-16', lastVisit: '2026-11-10', notes: 'Arthritis management, mobility improving.' },
  { id: 'P-1013', name: 'Zara Hussain', age: 41, gender: 'Female', phone: '(555) 486-5561', email: 'zara.h@example.com', bloodGroup: 'B+', address: '29 Dogwood Trail, Mapleton', registeredDate: '2025-05-19', lastVisit: '2026-10-25', notes: 'Thyroid levels stable on current dose.' },
  { id: 'P-1014', name: 'Leo Van Der Berg', age: 55, gender: 'Male', phone: '(555) 598-8843', email: 'leo.vdb@example.com', bloodGroup: 'O-', address: '73 Redwood Court, Oakdale', registeredDate: '2025-01-11', lastVisit: '2026-08-14', notes: 'Sleep apnea, CPAP tolerance good.' },
  { id: 'P-1015', name: 'Maya Lindqvist', age: 33, gender: 'Female', phone: '(555) 602-4470', email: 'maya.l@example.com', bloodGroup: 'A-', address: '16 Chestnut Grove, Riverbend', registeredDate: '2025-11-18', lastVisit: '2026-11-14', notes: 'Postpartum follow-up scheduled.' },
  { id: 'P-1016', name: 'Samuel Adeoye', age: 48, gender: 'Male', phone: '(555) 715-2297', email: 's.adeoye@example.com', bloodGroup: 'B-', address: '58 Hawthorne Street, Glenview', registeredDate: '2025-04-03', lastVisit: '2026-10-02', notes: 'Annual physical due in January.' },
];

export const seedDoctors: Doctor[] = [
  { id: 'D-201', name: 'Dr. Sarah Whitfield', specialization: 'Cardiologist', department: 'Cardiology', phone: '(555) 100-2001', email: 's.whitfield@medicareplus.com', availability: 'Available', experience: 14, rating: 4.9, color: 'bg-primary-500' },
  { id: 'D-202', name: 'Dr. James Osei', specialization: 'Pediatrician', department: 'Pediatrics', phone: '(555) 100-2002', email: 'j.osei@medicareplus.com', availability: 'Available', experience: 9, rating: 4.8, color: 'bg-teal-500' },
  { id: 'D-203', name: 'Dr. Elena Rodriguez', specialization: 'Neurologist', department: 'Neurology', phone: '(555) 100-2003', email: 'e.rodriguez@medicareplus.com', availability: 'In Surgery', experience: 11, rating: 4.7, color: 'bg-amber-500' },
  { id: 'D-204', name: 'Dr. Michael Tan', specialization: 'Orthopedic Surgeon', department: 'Orthopedics', phone: '(555) 100-2004', email: 'm.tan@medicareplus.com', availability: 'Available', experience: 17, rating: 4.9, color: 'bg-rose-500' },
  { id: 'D-205', name: 'Dr. Aisha Khan', specialization: 'General Practitioner', department: 'Family Medicine', phone: '(555) 100-2005', email: 'a.khan@medicareplus.com', availability: 'On Leave', experience: 7, rating: 4.6, color: 'bg-emerald-500' },
];

export const seedAppointments: Appointment[] = [
  { id: 'A-301', patientId: 'P-1001', doctorId: 'D-201', date: addDays(0), time: '09:00', reason: 'Cardiology follow-up', status: 'Confirmed' },
  { id: 'A-302', patientId: 'P-1005', doctorId: 'D-205', date: addDays(0), time: '10:30', reason: 'Diabetes review', status: 'Scheduled' },
  { id: 'A-303', patientId: 'P-1003', doctorId: 'D-202', date: addDays(0), time: '13:00', reason: 'Prenatal checkup', status: 'Confirmed' },
  { id: 'A-304', patientId: 'P-1010', doctorId: 'D-201', date: addDays(1), time: '11:00', reason: 'Cholesterol consultation', status: 'Scheduled' },
  { id: 'A-305', patientId: 'P-1007', doctorId: 'D-203', date: addDays(1), time: '15:30', reason: 'Migraine assessment', status: 'Scheduled' },
  { id: 'A-306', patientId: 'P-1012', doctorId: 'D-204', date: addDays(2), time: '09:45', reason: 'Joint pain evaluation', status: 'Scheduled' },
  { id: 'A-307', patientId: 'P-1002', doctorId: 'D-201', date: addDays(3), time: '14:15', reason: 'Blood pressure check', status: 'Scheduled' },
  { id: 'A-308', patientId: 'P-1009', doctorId: 'D-205', date: addDays(4), time: '10:00', reason: 'General consultation', status: 'Scheduled' },
  { id: 'A-309', patientId: 'P-1004', doctorId: 'D-202', date: addDays(5), time: '16:00', reason: 'School physical', status: 'Scheduled' },
  { id: 'A-310', patientId: 'P-1014', doctorId: 'D-203', date: addDays(-1), time: '11:30', reason: 'Sleep study results', status: 'Completed' },
  { id: 'A-311', patientId: 'P-1006', doctorId: 'D-201', date: addDays(-2), time: '09:30', reason: 'Rehab progress review', status: 'Completed' },
  { id: 'A-312', patientId: 'P-1013', doctorId: 'D-205', date: addDays(-3), time: '13:45', reason: 'Thyroid panel review', status: 'Completed' },
  { id: 'A-313', patientId: 'P-1008', doctorId: 'D-204', date: addDays(-4), time: '15:00', reason: 'Back pain follow-up', status: 'Cancelled' },
  { id: 'A-314', patientId: 'P-1015', doctorId: 'D-202', date: addDays(-5), time: '10:15', reason: 'Postpartum visit', status: 'Completed' },
  { id: 'A-315', patientId: 'P-1016', doctorId: 'D-201', date: addDays(-6), time: '08:30', reason: 'ECG and consult', status: 'Completed' },
  { id: 'A-316', patientId: 'P-1011', doctorId: 'D-204', date: addDays(-7), time: '12:00', reason: 'Sports injury check', status: 'Completed' },
];

export const seedInvoices: Invoice[] = [
  { id: 'I-401', number: 'INV-2026-041', patientId: 'P-1001', amount: 240, paymentDate: thisMonth(14), status: 'Paid', items: 'Cardiology consultation, ECG' },
  { id: 'I-402', number: 'INV-2026-042', patientId: 'P-1002', amount: 180, paymentDate: thisMonth(13), status: 'Paid', items: 'BP management visit' },
  { id: 'I-403', number: 'INV-2026-043', patientId: 'P-1003', amount: 320, paymentDate: thisMonth(12), status: 'Pending', items: 'Prenatal ultrasound package' },
  { id: 'I-404', number: 'INV-2026-044', patientId: 'P-1010', amount: 150, paymentDate: thisMonth(10), status: 'Paid', items: 'Lipid panel, dietary consult' },
  { id: 'I-405', number: 'INV-2026-045', patientId: 'P-1005', amount: 275, paymentDate: thisMonth(8), status: 'Overdue', items: 'Diabetes panel, HbA1c' },
  { id: 'I-406', number: 'INV-2026-046', patientId: 'P-1012', amount: 420, paymentDate: thisMonth(6), status: 'Paid', items: 'X-ray, orthopedic consult' },
  { id: 'I-407', number: 'INV-2026-047', patientId: 'P-1007', amount: 195, paymentDate: thisMonth(4), status: 'Pending', items: 'Neurology consult, MRI review' },
  { id: 'I-408', number: 'INV-2026-048', patientId: 'P-1009', amount: 120, paymentDate: thisMonth(2), status: 'Paid', items: 'New patient intake exam' },
];

export const weeklyAppointmentsSeed = [
  { day: 'Mon', appointments: 18, completed: 14 },
  { day: 'Tue', appointments: 24, completed: 20 },
  { day: 'Wed', appointments: 21, completed: 17 },
  { day: 'Thu', appointments: 27, completed: 22 },
  { day: 'Fri', appointments: 25, completed: 19 },
  { day: 'Sat', appointments: 12, completed: 10 },
  { day: 'Sun', appointments: 6, completed: 5 },
];
