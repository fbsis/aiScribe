import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@mui/material';

const mockCodes = [
  { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
  { code: 'R29.6', description: 'Repeated falls' },
  { code: 'S80.11XD', description: 'Contusion of right lower leg, subsequent encounter' },
];

const ICD10Tab: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        ICD-10-CM Codes
      </Typography>
      
      <List>
        {mockCodes.map((code) => (
          <ListItem key={code.code} sx={{ py: 1 }}>
            <ListItemText
              primary={code.code}
              secondary={code.description}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          placeholder="Add New ICD-10 Code"
          size="small"
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Code
        </Button>
      </Box>
    </Box>
  );
};

export default ICD10Tab; 