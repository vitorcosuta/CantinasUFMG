import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export const CantinaProdutoCard = ({ produto }) => {
    return (
        <Card
            sx={{
                height: 120,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                border: '1px solid #ccc',
                boxSizing: 'border-box',
            }}
        >
            <CardContent
                sx={{
                    height: '100%',
                    padding: 2,
                    pb: '16px !important',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold">
                            {produto.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Descrição: {produto.descricao}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 100,
                        }}
                    >
                        <Typography variant="h6" color="#D84040">
                            Valor:
                        </Typography>
                        <Box sx={{ mx: 1 }} />
                        <Typography
                            variant="h6"
                            color="#D84040"
                            fontWeight="bold"
                        >
                            R$ {produto.preco.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
