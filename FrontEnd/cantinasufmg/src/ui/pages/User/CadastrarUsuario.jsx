import React from 'react';
import { Box, Paper } from '@mui/material';
import { CadastrarUsuarioForm } from './components/CadastrarUsuarioForm';

export const CadastrarUsuario = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#EEEEEE',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    width: { xs: '90%', md: '70%', lg: '60%' },
                    maxWidth: 600,
                    height: { xs: 'auto', md: '70vh' },
                    borderRadius: 3,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        p: 4,
                    }}
                >
                    <CadastrarUsuarioForm />
                </Box>
            </Paper>
        </Box>
    );
};
