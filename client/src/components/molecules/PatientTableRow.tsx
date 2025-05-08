import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { Patient } from '../../types/patient';
import { StatusChip } from '../atoms/StatusChip';

interface PatientTableRowProps {
  patient: Patient;
}

export const PatientTableRow: React.FC<PatientTableRowProps> = ({ patient }) => (
  <TableRow>
    <TableCell>{patient.name}</TableCell>
    <TableCell>
      <StatusChip status={patient.status} />
    </TableCell>
    <TableCell>{patient.task}</TableCell>
    <TableCell>{patient.assigned}</TableCell>
  </TableRow>
); 