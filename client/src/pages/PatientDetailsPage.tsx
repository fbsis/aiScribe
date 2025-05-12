import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePatient } from '../hooks/usePatient';
import PatientDetailsHeader from '../components/organisms/PatientDetailsHeader';
import PatientInfo from '../components/organisms/PatientInfo';
import DiagnosisCodes from '../components/organisms/DiagnosisCodes';
import ClinicalSummary from '../components/organisms/ClinicalSummary';
import MedicationReview from '../components/organisms/MedicationReview';
import SidebarTabs from '../components/organisms/SidebarTabs';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: patient, isLoading, error } = usePatient(id!);

  if (error) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        Error loading patient details. Please try again.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#fafbfc' }}>
      {/* Left: Main Content (scrollable) */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 0, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PatientDetailsHeader patient={patient} />
        <div style={{ width: '100%', maxWidth: 900 }}>
          {isLoading ? (
            <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
              <LoadingSpinner />
            </div>
          ) : patient ? (
            <>
              <PatientInfo data={patient} />
              <DiagnosisCodes codes={patient.diagnosisCodes} />
              <ClinicalSummary summary={patient.clinicalSummary} />
              <MedicationReview medications={patient.medications} />
            </>
          ) : null}
        </div>
      </div>
      {/* Right: Sidebar (fixed, with tabs) */}
      <div style={{ width: "40vw", borderLeft: '1px solid #e0e0e0', background: '#fff', height: '100vh', position: 'sticky', top: 0 }}>
        <SidebarTabs loading={isLoading} patientId={id} />
      </div>
    </div>
  );
};

export default PatientDetailsPage; 