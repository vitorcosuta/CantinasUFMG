import React, { Fragment } from 'react';
import { CommonHeader } from '../../components/common/CommonHeader';
import { Box, Paper, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { CadastrarProdutoForm } from './components/CadastrarProdutoForm';
import { ROUTES } from '../../../routes/Routes';

export const CadastrarProduto = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Box
                sx={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <CommonHeader />
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0,
                    }}
                >
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
                                p: 3,
                                backgroundColor: '#ffffff',
                            }}
                        >
                            <Tooltip title="Voltar para produtos">
                                <IconButton
                                    onClick={() =>
                                        navigate(`${ROUTES.PRODUTOS}`)
                                    }
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        left: 16,
                                        color: '#888',
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
                                }}
                            >
                                <CadastrarProdutoForm />
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
};
