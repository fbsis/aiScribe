import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface SearchBarProps extends Omit<TextFieldProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search for...", ...props }) => (
  <TextField
    fullWidth
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    {...props}
  />
); 