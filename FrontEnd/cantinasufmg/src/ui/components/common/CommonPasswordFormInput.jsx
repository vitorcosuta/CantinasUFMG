import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';

export const CommonPasswordFormInput = ({
    value,
    label = 'Senha',
    onChange,
    error,
    helperText,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (e) => e.preventDefault();
    const handleMouseUpPassword = (e) => e.preventDefault();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormControl variant="outlined" fullWidth error={error}>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword
                                    ? 'Esconder senha'
                                    : 'Mostrar senha'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
