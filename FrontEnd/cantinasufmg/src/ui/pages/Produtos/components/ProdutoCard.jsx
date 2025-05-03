import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export const ProdutoCard = ({ produto }) => {
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
            <CardContent sx={{ padding: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    {produto.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Descrição: {produto.descricao}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Responsável pelo cadastro: {produto.owner?.email}
                </Typography>
            </CardContent>
        </Card>
    );
};
