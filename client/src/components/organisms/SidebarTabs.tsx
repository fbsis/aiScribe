import React, { useState } from 'react';
import OasisTab from './OasisTab';
import DischargeReportTab from './DischargeReportTab';
import IntakeTab from './IntakeTab';

const tabs = [
  { label: 'ICD-10 Codes', key: 'icd10' },
  { label: 'OASIS', key: 'oasis' },
  { label: 'Discharge Report', key: 'discharge' },
  { label: 'Intake', key: 'intake' },
];

const SidebarTabs: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [activeTab, setActiveTab] = useState('icd10');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: 12,
              background: activeTab === tab.key ? '#f5f5f5' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.key ? '2px solid #1976d2' : '2px solid transparent',
              fontWeight: activeTab === tab.key ? 'bold' : 'normal',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, padding: 0, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ padding: 20 }}>
            <div style={{ height: 32, width: '80%', background: '#eee', marginBottom: 16, borderRadius: 8 }} />
            <div style={{ height: 24, width: '60%', background: '#eee', marginBottom: 12, borderRadius: 8 }} />
            <div style={{ height: 24, width: '90%', background: '#eee', marginBottom: 12, borderRadius: 8 }} />
            <div style={{ height: 24, width: '70%', background: '#eee', marginBottom: 12, borderRadius: 8 }} />
          </div>
        ) : (
          <>
            {activeTab === 'icd10' && (
              <div style={{ padding: 20 }}>
                <h4>ICD-10-CM Codes</h4>
                <ul style={{ paddingLeft: 16 }}>
                  <li>E11.9 - Type 2 diabetes mellitus without complications</li>
                  <li>R29.6 - Repeated falls</li>
                  <li>S80.11XD - Contusion of right lower leg, subsequent encounter</li>
                </ul>
                <input placeholder="Add New ICD-10 Code" style={{ width: '100%', padding: 8, marginTop: 12, borderRadius: 4, border: '1px solid #ccc' }} />
                <button style={{ marginTop: 8, padding: '6px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Add</button>
              </div>
            )}
            {activeTab === 'oasis' && <OasisTab />}
            {activeTab === 'discharge' && <DischargeReportTab />}
            {activeTab === 'intake' && <IntakeTab />}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarTabs; 