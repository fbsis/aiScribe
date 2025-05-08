export const patientDetailsMock = {
  name: 'Margaret Johnson',
  mrn: '12345678',
  dob: '04/17/1945',
  startOfCare: '04/08/2025',
  visitDate: '04/10/2025',
  discipline: 'Skilled Nursing',
  clinician: 'Sarah Nguyen, RN',
  referralSource: "Discharge from St. Mary's Hospital following CHF exacerbation",
  physician: 'Dr. Alan Rivera',
  insurance: 'Medicare A',
  diagnosisCodes: [
    { code: 'I50.32', description: 'Chronic diastolic (congestive) heart failure', type: 'Primary' },
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications', type: 'Secondary' },
    { code: 'I10', description: 'Essential (primary) hypertension', type: 'Secondary' },
    { code: 'R63.4', description: 'Abnormal weight loss', type: 'Secondary' },
  ],
  clinicalSummary: {
    chiefComplaint: 'Feeling weak and short of breath since coming home.',
    vitals: 'BP 142/86, HR 84, Temp 97.8°F, O2 Sat 94% RA',
    heart: 'Irregular rhythm, 2+ edema bilateral lower extremities',
    lungs: 'Scattered crackles in bases, diminished breath sounds',
  },
  medications: [
    { name: 'Furosemide', dosage: '40mg', frequency: 'Daily', route: 'PO' },
  ],
}; 