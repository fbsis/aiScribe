import React from 'react';

interface ClinicalSummaryProps {
  summary?: {
    chiefComplaint?: string;
    vitals?: string;
    heart?: string;
    lungs?: string;
  };
}

const ClinicalSummary: React.FC<ClinicalSummaryProps> = ({ summary = {} }) => (
  <div style={{ marginBottom: 32 }}>
    <h3>Clinical Assessment Summary:</h3>
    <ul style={{ marginTop: 8 }}>
      <li><b>Chief Complaint:</b> "{summary.chiefComplaint || 'N/A'}"</li>
      <li><b>Vitals:</b> {summary.vitals || 'N/A'}</li>
      <li><b>Heart:</b> {summary.heart || 'N/A'}</li>
      <li><b>Lungs:</b> {summary.lungs || 'N/A'}</li>
    </ul>
  </div>
);

export default ClinicalSummary; 