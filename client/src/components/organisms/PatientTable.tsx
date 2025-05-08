import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Patient } from "../../types/patient";
import { PatientTableRow } from "../molecules/PatientTableRow";

interface PatientTableProps {
  patients: Patient[];
}

export const PatientTable: React.FC<PatientTableProps> = ({ patients }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Patient Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Task Type</TableCell>
          <TableCell>Assigned to</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((patient, index) => (
          <PatientTableRow key={index} patient={patient} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
); 