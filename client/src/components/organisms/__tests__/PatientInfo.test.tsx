import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PatientInfo from '../PatientInfo';

const mockPatientData = {
  name: 'John Doe',
  mrn: '12345',
  dob: '1980-01-01',
  startOfCare: '2024-01-01',
  visitDate: '2024-03-15',
  discipline: 'Physical Therapy',
  clinician: 'Dr. Smith',
  referralSource: 'Hospital A',
  physician: 'Dr. Johnson',
  insurance: 'Blue Cross'
};

describe('PatientInfo', () => {
  it('renders the title', () => {
    render(<PatientInfo data={mockPatientData} />);
    expect(screen.getByText('Home Healthcare Clinical Note')).toBeInTheDocument();
  });

  it('renders all patient information fields', () => {
    render(<PatientInfo data={mockPatientData} />);
    
    // Check if all fields are rendered
    expect(screen.getByText(/Patient Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/MRN:/i)).toBeInTheDocument();
    expect(screen.getByText(/DOB:/i)).toBeInTheDocument();
    expect(screen.getByText(/Start of Care Date:/i)).toBeInTheDocument();
    expect(screen.getByText(/Visit Date:/i)).toBeInTheDocument();
    expect(screen.getByText(/Discipline:/i)).toBeInTheDocument();
    expect(screen.getByText(/Clinician:/i)).toBeInTheDocument();
    expect(screen.getByText(/Referral Source:/i)).toBeInTheDocument();
    expect(screen.getByText(/Physician:/i)).toBeInTheDocument();
    expect(screen.getByText(/Primary Insurance:/i)).toBeInTheDocument();
  });

  it('displays the correct patient data', () => {
    render(<PatientInfo data={mockPatientData} />);
    
    // Check if all values are displayed correctly
    expect(screen.getByText(mockPatientData.name)).toBeInTheDocument();
    expect(screen.getByText(mockPatientData.mrn)).toBeInTheDocument();
    expect(screen.getByText(mockPatientData.dob)).toBeInTheDocument();
    expect(screen.getByText(mockPatientData.startOfCare)).toBeInTheDocument();
    expect(screen.getByText(mockPatientData.visitDate)).toBeInTheDocument();
    expect(screen.getByText(mockPatientData.discipline)).toBeInTheDocument();
    expect(screen.getByText(mockPatientData.clinician)).toBeInTheDocument();
    expect(screen.getByText(mockPatientData.referralSource)).toBeInTheDocument();
    expect(screen.getByText(mockPatientData.physician)).toBeInTheDocument();
    expect(screen.getByText(mockPatientData.insurance)).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    render(<PatientInfo data={mockPatientData} />);
    const container = screen.getByText('Home Healthcare Clinical Note').parentElement;
    
    expect(container).toHaveStyle({
      marginBottom: '32px'
    });
    
    const title = screen.getByText('Home Healthcare Clinical Note');
    expect(title).toHaveStyle({
      marginBottom: '8px'
    });
  });
}); 