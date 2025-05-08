import React from 'react';

type DiagnosisCode = {
  code: string;
  description: string;
  type: string;
};

type DiagnosisCodesProps = {
  codes: DiagnosisCode[];
};

const DiagnosisCodes: React.FC<DiagnosisCodesProps> = ({ codes }) => (
  <div style={{ marginBottom: 32 }}>
    <h3>Diagnosis Codes (ICD-10):</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
      <thead>
        <tr style={{ background: '#f5f5f5' }}>
          <th style={{ textAlign: 'left', padding: 6, border: '1px solid #ddd' }}>Code</th>
          <th style={{ textAlign: 'left', padding: 6, border: '1px solid #ddd' }}>Description</th>
          <th style={{ textAlign: 'left', padding: 6, border: '1px solid #ddd' }}>Type</th>
        </tr>
      </thead>
      <tbody>
        {codes.map((c) => (
          <tr key={c.code}>
            <td style={{ padding: 6, border: '1px solid #ddd' }}>{c.code}</td>
            <td style={{ padding: 6, border: '1px solid #ddd' }}>{c.description}</td>
            <td style={{ padding: 6, border: '1px solid #ddd' }}>{c.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DiagnosisCodes; 