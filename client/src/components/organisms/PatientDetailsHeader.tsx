import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import BackButton from '../atoms/BackButton';
import StatusBadge from '../atoms/StatusBadge';

const PatientDetailsHeader: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          background: '#fff',
          borderRadius: 2,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          mb: 4,
        }}
      >
        <Box sx={{ p: '20px 24px 8px 24px' }}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 1 }}>
            <BackButton />
            <Typography variant="body1" sx={{ fontWeight: 500, mr: 2 }}>
              Patient: Amanda Collins
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>Status:</Typography>
              <StatusBadge status="In progress" />
            </Box>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Assigned to: John
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Update Patient
            </Button>
          </Box>

          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, mr: 3 }}>
              Patient Documentation
            </Typography>
            <Select
              size="small"
              defaultValue="referral1"
              sx={{ mr: 1.5, minWidth: 120 }}
            >
              <MenuItem value="referral1">Referral 1</MenuItem>
            </Select>
            <Button
              variant="outlined"
              size="small"
              sx={{ mr: 0.5 }}
            >
              OCR
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ mr: 2 }}
            >
              PDF
            </Button>
            <Typography variant="body2" sx={{ mr: 1.5 }}>
              1/4 pages
            </Typography>
            <Button
              color="error"
              variant="text"
              sx={{ fontWeight: 500 }}
            >
              Delete Chart ×
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDetailsHeader; 