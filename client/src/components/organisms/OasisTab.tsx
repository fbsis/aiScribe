import React from 'react';
import { oasisReimbursement, oasisReview } from '../../mocks/oasis';

const OasisTab: React.FC = () => (
  <div style={{ padding: 12 }}>
    <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, background: '#fafbfc', marginBottom: 24, padding: 20 }}>
      <div style={{ fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 8 }}>📝</span>OASIS Reimbursement
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', rowGap: 8, columnGap: 8 }}>
        <div>Primary Diagnosis Code:</div>
        <div><b>{oasisReimbursement.primaryDiagnosisCode}</b></div>
        <div>Admission Source & Timing:</div>
        <div><b>{oasisReimbursement.admissionSource}</b></div>
        <div>Clinical Group & Level:</div>
        <div><b>{oasisReimbursement.clinicalGroup}</b></div>
        <div>Comorbidity Adjustment:</div>
        <div>{oasisReimbursement.comorbidityAdjustment}</div>
        <div>LUPA Level:</div>
        <div>{oasisReimbursement.lupaLevel}</div>
        <div>HIPPS Code:</div>
        <div>{oasisReimbursement.hippsCode}</div>
        <div>OASIS Revenue:</div>
        <div><b>{oasisReimbursement.oasisRevenue}</b></div>
      </div>
    </div>
    <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, background: '#fafbfc', padding: 20 }}>
      <div style={{ fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 8 }}>📝</span>OASIS Review
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ textAlign: 'left', padding: 6 }}>Item</th>
            <th style={{ textAlign: 'left', padding: 6 }}>Description</th>
            <th style={{ textAlign: 'center', padding: 6 }}>Clinician Answer</th>
            <th style={{ textAlign: 'center', padding: 6 }}>Review</th>
          </tr>
        </thead>
        <tbody>
          {oasisReview.map((row) => (
            <tr key={row.item}>
              <td style={{ padding: 6 }}>{row.item}</td>
              <td style={{ padding: 6 }}>{row.description}</td>
              <td style={{ textAlign: 'center', padding: 6 }}>{row.clinicianAnswer}</td>
              <td style={{ textAlign: 'center', padding: 6 }}>
                <select value={row.review} disabled style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #ccc' }}>
                  {[1,2,3,4].map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OasisTab; 