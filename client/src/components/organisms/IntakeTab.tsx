import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicationIcon from '@mui/icons-material/Medication';
import { intakeSummary, intakeMedications } from '../../mocks/intake';

const IntakeTab: React.FC = () => {
  const [summary, setSummary] = useState(intakeSummary);
  const [medications, setMedications] = useState(intakeMedications);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.default',
          mb: 3,
          p: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Patient Summary
          </Typography>
          <IconButton
            onClick={() => handleCopy(summary)}
            size="small"
            sx={{ ml: 'auto' }}
            title="Copy to clipboard"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          multiline
          minRows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter patient summary here..."
          variant="outlined"
          size="small"
        />
      </Paper>

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.default',
          p: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <MedicationIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Medications
          </Typography>
          <IconButton
            onClick={() => handleCopy(medications)}
            size="small"
            sx={{ ml: 'auto' }}
            title="Copy to clipboard"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          multiline
          minRows={4}
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          placeholder="Enter medications here..."
          variant="outlined"
          size="small"
        />
      </Paper>
    </Box>
  );
};

export default IntakeTab; 