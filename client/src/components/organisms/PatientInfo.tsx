import React from 'react';

type PatientInfoProps = {
  data: {
    name: string;
    mrn: string;
    dob: string;
    startOfCare: string;
    visitDate: string;
    discipline: string;
    clinician: string;
    referralSource: string;
    physician: string;
    insurance: string;
  };
};

const PatientInfo: React.FC<PatientInfoProps> = ({ data }) => (
  <div style={{ marginBottom: 32 }}>
    <h2 style={{ marginBottom: 8 }}>Home Healthcare Clinical Note</h2>
    <div><b>Patient Name:</b> {data.name}</div>
    <div><b>MRN:</b> {data.mrn}</div>
    <div><b>DOB:</b> {data.dob}</div>
    <div><b>Start of Care Date:</b> {data.startOfCare}</div>
    <div><b>Visit Date:</b> {data.visitDate}</div>
    <div><b>Discipline:</b> {data.discipline}</div>
    <div><b>Clinician:</b> {data.clinician}</div>
    <div><b>Referral Source:</b> {data.referralSource}</div>
    <div><b>Physician:</b> {data.physician}</div>
    <div><b>Primary Insurance:</b> {data.insurance}</div>
  </div>
);

export default PatientInfo; 