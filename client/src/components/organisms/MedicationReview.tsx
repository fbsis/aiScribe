import React from 'react';

type Medication = {
  name: string;
  dosage: string;
  frequency: string;
  route: string;
};

type MedicationReviewProps = {
  medications: Medication[];
};

const MedicationReview: React.FC<MedicationReviewProps> = ({ medications }) => (
  <div style={{ marginBottom: 32 }}>
    <h3>Medication Review</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
      <thead>
        <tr style={{ background: '#f5f5f5' }}>
          <th style={{ textAlign: 'left', padding: 6, border: '1px solid #ddd' }}>Medication</th>
          <th style={{ textAlign: 'left', padding: 6, border: '1px solid #ddd' }}>Dosage</th>
          <th style={{ textAlign: 'left', padding: 6, border: '1px solid #ddd' }}>Frequency</th>
          <th style={{ textAlign: 'left', padding: 6, border: '1px solid #ddd' }}>Route</th>
        </tr>
      </thead>
      <tbody>
        {medications.map((m, idx) => (
          <tr key={idx}>
            <td style={{ padding: 6, border: '1px solid #ddd' }}>{m.name}</td>
            <td style={{ padding: 6, border: '1px solid #ddd' }}>{m.dosage}</td>
            <td style={{ padding: 6, border: '1px solid #ddd' }}>{m.frequency}</td>
            <td style={{ padding: 6, border: '1px solid #ddd' }}>{m.route}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MedicationReview; 