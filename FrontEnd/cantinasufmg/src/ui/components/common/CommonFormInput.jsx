import React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export const CommonFormInput = ({
    value,
    label,
    placeholder,
    onChange,
    error,
    helperText,
    disabled = false,
}) => {
    return (
        <FormControl sx={{ flex: 1, minWidth: 0 }}>
            <TextField
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                variant="outlined"
                error={error}
                helperText={helperText}
                disabled={disabled}
            />
        </FormControl>
    );
};
