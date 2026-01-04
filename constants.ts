
import { HealthRecord, PatientProfile } from './types';

export const MOCK_PATIENT: PatientProfile = {
  name: "Alexander Pierce",
  age: 42,
  gender: "Male",
  bloodType: "A+",
  allergies: ["Penicillin", "Peanuts"],
  chronicConditions: ["Hypertension", "Type 2 Diabetes Management"]
};

export const MOCK_RECORDS: HealthRecord[] = [
  {
    id: '1',
    date: '2024-03-15',
    source: 'General Hospital North',
    type: 'Lab Result',
    title: 'Comprehensive Metabolic Panel',
    summary: 'Elevated glucose levels noted (145 mg/dL). HbA1c at 7.1%. Liver enzymes within normal range.'
  },
  {
    id: '2',
    date: '2024-02-10',
    source: 'City Cardiology Center',
    type: 'Clinical Note',
    title: 'Routine Cardiac Follow-up',
    summary: 'Blood pressure 138/88. Patient reports occasional fatigue. Heart sounds normal. Adjusted medication dosage.'
  },
  {
    id: '3',
    date: '2024-01-20',
    source: 'Walgreens Pharmacy',
    type: 'Prescription',
    title: 'Metformin Renewal',
    summary: 'Metformin 500mg - Take one tablet twice daily with meals.'
  },
  {
    id: '4',
    date: '2023-11-05',
    source: 'Wellness First Clinic',
    type: 'Immunization',
    title: 'Annual Flu Shot',
    summary: 'Administered 2023-2024 seasonal influenza vaccine. No immediate adverse reactions.'
  }
];

export const VITALS_DATA = [
  { date: 'Jan', bp_sys: 140, bp_dia: 90, glucose: 130 },
  { date: 'Feb', bp_sys: 138, bp_dia: 88, glucose: 135 },
  { date: 'Mar', bp_sys: 135, bp_dia: 85, glucose: 145 },
  { date: 'Apr', bp_sys: 132, bp_dia: 82, glucose: 128 },
  { date: 'May', bp_sys: 130, bp_dia: 80, glucose: 120 },
];
