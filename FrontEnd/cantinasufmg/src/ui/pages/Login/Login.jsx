import React from 'react';
import { Box, Paper } from '@mui/material';
import { LoginForm } from './components/LoginForm';

export const Login = () => {
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
                    maxWidth: 1200,
                    height: { xs: 'auto', md: '70vh' },
                    borderRadius: 3,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        width: '50%',
                        backgroundColor: '#8E1616',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 4,
                    }}
                >
                    <Box
                        component="img"
                        src="/logo.png"
                        alt="Logo"
                        sx={{
                            height: { xs: 250, md: 350 },
                            objectFit: 'contain',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        p: 4,
                    }}
                >
                    <LoginForm />
                </Box>
            </Paper>
        </Box>
    );
};
