import React from 'react';
import { TableRow, TableCell, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../../types/patient';
import { StatusChip } from '../atoms/StatusChip';

interface PatientTableRowProps {
  patient: Patient;
}

export const PatientTableRow: React.FC<PatientTableRowProps> = ({ patient }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patients/${patient.id}`);
  };

  return (
    <TableRow hover>
      <TableCell>
        <Link
          component="button"
          onClick={handleClick}
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {patient.name}
        </Link>
      </TableCell>
      <TableCell>
        <StatusChip status={patient.status} />
      </TableCell>
      <TableCell>{patient.task}</TableCell>
      <TableCell>{patient.assigned}</TableCell>
    </TableRow>
  );
}; 