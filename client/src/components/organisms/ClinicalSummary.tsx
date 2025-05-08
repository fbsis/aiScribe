import React from 'react';

type ClinicalSummaryProps = {
  summary: {
    chiefComplaint: string;
    vitals: string;
    heart: string;
    lungs: string;
  };
};

const ClinicalSummary: React.FC<ClinicalSummaryProps> = ({ summary }) => (
  <div style={{ marginBottom: 32 }}>
    <h3>Clinical Assessment Summary:</h3>
    <ul style={{ marginTop: 8 }}>
      <li><b>Chief Complaint:</b> "{summary.chiefComplaint}"</li>
      <li><b>Vitals:</b> {summary.vitals}</li>
      <li><b>Heart:</b> {summary.heart}</li>
      <li><b>Lungs:</b> {summary.lungs}</li>
    </ul>
  </div>
);

export default ClinicalSummary; 