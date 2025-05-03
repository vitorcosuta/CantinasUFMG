import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { VincularProdutoCard } from './VincularProdutoCard';
import { getProdutos } from '../../../../api/produtoService';

export const VincularProdutosList = ({
    selectedProdutos,
    setSelectedProdutos,
    precos,
    setPrecos,
}) => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await getProdutos();
                setProdutos(response.data);
            } catch (err) {
                setError('Erro ao carregar produtos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();

        // const mockProdutos = [
        //     { id: 1, nome: 'agua' },
        //     { id: 2, nome: 'Pastel' },
        //     { id: 3, nome: 'Refrigeranteeeeeeeeeeeeeee' },
        //     { id: 1, nome: 'pao' },
        //     { id: 2, nome: 'alho' },
        //     { id: 3, nome: 'agua' },
        //     { id: 1, nome: 'agua' },
        //     { id: 2, nome: 'Pastel' },
        //     { id: 3, nome: 'Refrigerante' },
        //     { id: 1, nome: 'pao' },
        //     { id: 2, nome: 'alho' },
        //     { id: 3, nome: 'agua' },
        // ];
        // setProdutos(mockProdutos);
        // setLoading(false);
    }, []);

    const setPreco = (id, value) => {
        setPrecos((prev) => ({ ...prev, [id]: value }));
    };

    const toggleProduto = (produtoId) => {
        setSelectedProdutos((prev) =>
            prev.includes(produtoId)
                ? prev.filter((id) => id !== produtoId)
                : [...prev, produtoId]
        );
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress sx={{ color: '#8E1616' }} />
            </Box>
        );
    }

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box
            sx={{
                flex: 1,
                overflowY: 'auto',
                maxHeight: '100px',
                px: 1,
                py: 1,
                border: '1px solid #ccc',
                borderRadius: '8px',
            }}
        >
            {produtos.length === 0 ? (
                <Typography
                    variant="body2"
                    textAlign="center"
                    color="text.secondary"
                >
                    Nenhum produto cadastrado
                </Typography>
            ) : (
                produtos.map((produto, index) => (
                    <VincularProdutoCard
                        key={index}
                        produto={produto}
                        isSelected={selectedProdutos.includes(produto.id)}
                        toggleProduto={toggleProduto}
                        preco={precos[produto.id]}
                        setPreco={setPreco}
                    />
                ))
            )}
        </Box>
    );
};
