import React, { useState } from "react";
import { usePatients } from "../hooks/usePatients";
import { PatientTable } from "../components/organisms/PatientTable";
import { SearchBar } from "../components/molecules/SearchBar";
import { LoadingSpinner } from "../components/atoms/LoadingSpinner";
import { PageTitle } from "../components/atoms/PageTitle";
import { PrimaryButton } from "../components/atoms/PrimaryButton";
import { PageContainer } from "../components/molecules/PageContainer";
import { filterPatientsByName } from "../utils/patientFilters";
import { Patient } from "../types/patient";
export default function PatientList() {
  const [search, setSearch] = useState("");
  const { data: patientsData, isLoading } = usePatients();

  const filteredPatients = filterPatientsByName(patientsData ?? [] as Patient[], search);

  return (
    <PageContainer>
      <PageTitle>Patient List: Organization Name</PageTitle>
      <SearchBar
        placeholder="Search patient name..."
        value={search}
        onChange={setSearch}
        sx={{ mb: 3 }}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <PatientTable patients={filteredPatients} />
      )}
      <PrimaryButton>Add New Patient</PrimaryButton>
    </PageContainer>
  );
} 