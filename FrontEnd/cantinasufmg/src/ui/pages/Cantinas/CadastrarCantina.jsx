import React, { Fragment } from 'react';
import { CommonHeader } from '../../components/common/CommonHeader';
import { Box, Paper, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { CadastrarCantinaForm } from './components/CadastrarCantinaForm';
import { ROUTES } from '../../../routes/Routes';

export const CadastrarCantina = () => {
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
                            alignItems: 'flex-start',
                            backgroundColor: '#EEEEEE',
                            paddingTop: '105px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '48vw',
                                height: { xs: 'auto', md: '80vh' },
                                borderRadius: 3,
                                overflow: 'auto',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: '#ffffff',
                            }}
                        >
                            <Tooltip title="Voltar para cantinas">
                                <IconButton
                                    onClick={() =>
                                        navigate(`${ROUTES.CANTINAS}`)
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
                                    alignItems: 'flex-start',
                                    backgroundColor: '#ffffff',
                                    pb: 4,
                                }}
                            >
                                <CadastrarCantinaForm />
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
};
