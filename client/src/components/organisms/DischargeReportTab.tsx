import React from 'react';
import { dischargeStartOfCare, dischargeEndOfCare } from '../../mocks/dischargeReport';

const DischargeReportTab: React.FC = () => (
  <div style={{ padding: 12 }}>
    <div style={{ display: 'flex', gap: 24 }}>
      {/* Start of Care */}
      <div style={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 8, background: '#fafbfc', padding: 20 }}>
        <div style={{ fontWeight: 600, marginBottom: 12 }}>Start of Care</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ textAlign: 'left', padding: 6 }}>OASIS item</th>
              <th style={{ textAlign: 'left', padding: 6 }}>Description</th>
              <th style={{ textAlign: 'center', padding: 6 }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {dischargeStartOfCare.map((row) => (
              <tr key={row.item}>
                <td style={{ padding: 6 }}>{row.item}</td>
                <td style={{ padding: 6 }}>{row.description}</td>
                <td style={{ textAlign: 'center', padding: 6 }}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* End of Care */}
      <div style={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 8, background: '#fafbfc', padding: 20 }}>
        <div style={{ fontWeight: 600, marginBottom: 12 }}>End of Care</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ textAlign: 'left', padding: 6 }}>OASIS item</th>
              <th style={{ textAlign: 'left', padding: 6 }}>Description</th>
              <th style={{ textAlign: 'center', padding: 6 }}>Value</th>
              <th style={{ textAlign: 'center', padding: 6 }}>Patient Progress</th>
            </tr>
          </thead>
          <tbody>
            {dischargeEndOfCare.map((row) => (
              <tr key={row.item}>
                <td style={{ padding: 6 }}>{row.item}</td>
                <td style={{ padding: 6 }}>{row.description}</td>
                <td style={{ textAlign: 'center', padding: 6 }}>{row.value}</td>
                <td style={{ textAlign: 'center', padding: 6, color: row.progress === 'Increased' ? '#d32f2f' : row.progress === 'Declined' ? '#f39c12' : '#219653' }}>{row.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DischargeReportTab; 