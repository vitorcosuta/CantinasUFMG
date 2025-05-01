import React from 'react';
import { Box, Paper, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { CadastrarUsuarioForm } from './components/CadastrarUsuarioForm';
import { ROUTES } from '../../../routes/Routes';

export const CadastrarUsuario = () => {
    const navigate = useNavigate();

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
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '90%', md: '70%', lg: '60%' },
                    maxWidth: 600,
                    height: { xs: 'auto', md: '70vh' },
                    borderRadius: 3,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Tooltip title="Voltar para o login">
                    <IconButton
                        onClick={() => navigate(ROUTES.LOGIN)}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            color: '#EEEEEE',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>

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
