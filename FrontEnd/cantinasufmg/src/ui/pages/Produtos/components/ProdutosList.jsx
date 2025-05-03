import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { ProdutoCard } from './ProdutoCard';
import { getProdutos } from '../../../../api/produtoService';

export const ProdutosList = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await getProdutos();
                const produtos = response.data;

                setProdutos(produtos);
            } catch (err) {
                setError('Erro ao carregar produtos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress sx={{ color: '#8E1616' }} />
            </Box>
        );
    }

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                px: 1,
                pb: 1,
                boxSizing: 'border-box',
                maxWidth: '100%',
                overflowX: 'hidden',
            }}
        >
            {produtos.length === 0 ? (
                <Typography
                    variant="h6"
                    color="textSecondary"
                    textAlign="center"
                >
                    Nenhum produto cadastrado.
                </Typography>
            ) : (
                produtos.map((produto) => (
                    <ProdutoCard key={produto.id} produto={produto} />
                ))
            )}
        </Box>
    );
};
