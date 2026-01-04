
export interface HealthRecord {
  id: string;
  date: string;
  source: string;
  type: 'Lab Result' | 'Clinical Note' | 'Prescription' | 'Immunization';
  title: string;
  summary: string;
  details?: any;
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface HealthMetric {
  date: string;
  value: number;
}
