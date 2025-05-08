import React, { useEffect, useState } from 'react';
import PatientDetailsHeader from '../components/organisms/PatientDetailsHeader';
import PatientInfo from '../components/organisms/PatientInfo';
import DiagnosisCodes from '../components/organisms/DiagnosisCodes';
import ClinicalSummary from '../components/organisms/ClinicalSummary';
import MedicationReview from '../components/organisms/MedicationReview';
import SidebarTabs from '../components/organisms/SidebarTabs';
import { patientDetailsMock } from '../mocks/patientDetails';

const PatientDetailsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setPatientData(patientDetailsMock);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#fafbfc' }}>
      {/* Left: Main Content (scrollable) */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 0, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PatientDetailsHeader />
        <div style={{ width: '100%', maxWidth: 900 }}>
          {loading ? (
            <div>
              {/* Skeletons for each section */}
              <div style={{ height: 40, width: 300, background: '#eee', marginBottom: 24, borderRadius: 8 }} />
              <div style={{ height: 120, width: '100%', background: '#eee', marginBottom: 24, borderRadius: 8 }} />
              <div style={{ height: 80, width: '100%', background: '#eee', marginBottom: 24, borderRadius: 8 }} />
              <div style={{ height: 60, width: '100%', background: '#eee', marginBottom: 24, borderRadius: 8 }} />
            </div>
          ) : (
            <>
              <PatientInfo data={patientData} />
              <DiagnosisCodes codes={patientData.diagnosisCodes} />
              <ClinicalSummary summary={patientData.clinicalSummary} />
              <MedicationReview medications={patientData.medications} />
            </>
          )}
        </div>
      </div>
      {/* Right: Sidebar (fixed, with tabs) */}
      <div style={{ width: "40vw", borderLeft: '1px solid #e0e0e0', background: '#fff', height: '100vh', position: 'sticky', top: 0 }}>
        <SidebarTabs loading={loading} />
      </div>
    </div>
  );
};

export default PatientDetailsPage; 