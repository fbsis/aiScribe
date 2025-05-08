import React, { useState } from 'react';
import { intakeSummary, intakeMedications } from '../../mocks/intake';

const IntakeTab: React.FC = () => {
  const [summary, setSummary] = useState(intakeSummary);
  const [medications, setMedications] = useState(intakeMedications);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ padding: 12 }}>
      <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, background: '#fafbfc', marginBottom: 24, padding: 20 }}>
        <div style={{ fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 8 }}>📄</span>Patient Summary
          <button onClick={() => handleCopy(summary)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }} title="Copy"><span role="img" aria-label="copy">📋</span></button>
        </div>
        <textarea
          value={summary}
          onChange={e => setSummary(e.target.value)}
          placeholder="Enter patient summary here..."
          style={{ width: '100%', minHeight: 80, borderRadius: 8, border: '1px solid #ddd', padding: 10, fontSize: 15, resize: 'vertical' }}
        />
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, background: '#fafbfc', padding: 20 }}>
        <div style={{ fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 8 }}>💊</span>Medications
          <button onClick={() => handleCopy(medications)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }} title="Copy"><span role="img" aria-label="copy">📋</span></button>
        </div>
        <textarea
          value={medications}
          onChange={e => setMedications(e.target.value)}
          placeholder="Enter medications here..."
          style={{ width: '100%', minHeight: 80, borderRadius: 8, border: '1px solid #ddd', padding: 10, fontSize: 15, resize: 'vertical' }}
        />
      </div>
    </div>
  );
};

export default IntakeTab; 