import React, { Fragment } from 'react';
import { CommonHeader } from '../../components/common/CommonHeader';
import { Box, Button, Paper, Typography } from '@mui/material';
import { ProdutosList } from './components/ProdutosList';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/Routes';

export const ProdutosHome = () => {
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
                                display: 'flex',
                                flexDirection: 'column',
                                width: '45vw',
                                height: { xs: 'auto', md: '70vh' },
                                borderRadius: 3,
                                overflow: 'hidden',
                                p: 3,
                                backgroundColor: '#ffffff',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: '100%',
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    textAlign="center"
                                    color="#262423"
                                >
                                    Lista de Produtos Cadastrados
                                </Typography>

                                <Box
                                    sx={{
                                        width: '100%',
                                        flex: 1,
                                        overflowY: 'auto',
                                        overflowX: 'hidden',
                                    }}
                                >
                                    <ProdutosList />
                                </Box>

                                <Button
                                    sx={{
                                        width: '100%',
                                        borderRadius: '999px',
                                        fontWeight: 'bold',
                                        backgroundColor: '#8E1616',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#a31e1e',
                                        },
                                    }}
                                    variant="contained"
                                    onClick={() =>
                                        navigate(
                                            `${ROUTES.PRODUTOS}${ROUTES.PRODUTOS_CADASTRAR}`
                                        )
                                    }
                                >
                                    Adicionar novo produto
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
};
