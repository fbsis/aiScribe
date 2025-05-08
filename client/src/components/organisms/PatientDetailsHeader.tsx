import React from 'react';

const PatientDetailsHeader: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      margin: '0 auto 32px auto',
      padding: '20px 24px 8px 24px',
      maxWidth: 900,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <button style={{ marginRight: 16, background: 'none', border: 'none', color: '#1976d2', fontWeight: 500, cursor: 'pointer' }}>{'< Back'}</button>
        <span style={{ fontWeight: 500, fontSize: 16, marginRight: 16 }}>Patient: Amanda Collins</span>
        <span style={{ marginRight: 16 }}>Status: <span style={{ color: '#219653', fontWeight: 600 }}>In progress</span></span>
        <span style={{ marginRight: 16 }}>Assigned to: John</span>
        <div style={{ flex: 1 }} />
        <button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Update Patient</button>
      </div>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 0, marginTop: 8 }}>
        <span style={{ fontWeight: 500, marginRight: 24 }}>Patient Documentation</span>
        <select style={{ marginRight: 12, padding: '2px 8px', borderRadius: 4, border: '1px solid #ccc' }}>
          <option>Referral 1</option>
        </select>
        <button style={{ marginRight: 4, padding: '2px 10px', borderRadius: 4, border: '1px solid #bbb', background: '#f5f5f5', fontWeight: 500 }}>OCR</button>
        <button style={{ marginRight: 16, padding: '2px 10px', borderRadius: 4, border: '1px solid #bbb', background: '#f5f5f5', fontWeight: 500 }}>PDF</button>
        <span style={{ color: '#222', fontSize: 15, marginRight: 12 }}>1/4 pages</span>
        <button style={{ color: '#d32f2f', background: 'none', border: 'none', fontWeight: 500, cursor: 'pointer' }}>Delete Chart <span style={{ fontWeight: 700 }}>×</span></button>
      </div>
    </div>
  );
};

export default PatientDetailsHeader; 