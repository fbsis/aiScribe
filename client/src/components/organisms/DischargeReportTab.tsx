import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { dischargeStartOfCare, dischargeEndOfCare } from '../../mocks/dischargeReport';

const DischargeReportTab: React.FC = () => (
  <Box sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', gap: 3 }}>
      {/* Start of Care */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.default',
          p: 2.5,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Start of Care
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>OASIS item</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dischargeStartOfCare.map((row) => (
                <TableRow key={row.item}>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="center">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* End of Care */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.default',
          p: 2.5,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          End of Care
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>OASIS item</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Value</TableCell>
                <TableCell align="center">Patient Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dischargeEndOfCare.map((row) => (
                <TableRow key={row.item}>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="center">{row.value}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: row.progress === 'Improved' ? 'success.main' :
                             row.progress === 'Declined' ? 'warning.main' :
                             'error.main'
                    }}
                  >
                    {row.progress}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  </Box>
);

export default DischargeReportTab; 