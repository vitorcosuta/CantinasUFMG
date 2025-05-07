import React, { Fragment, useEffect, useState } from 'react';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { CantinaCard } from './CantinaCard';
import { getCantinas } from '../../../../api/cantinaService';

export const CantinasList = () => {
    const [cantinas, setCantinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchCantinas = async () => {
            try {
                const response = await getCantinas();
                const cantinas = response.data;

                setCantinas(cantinas);
            } catch (err) {
                setError('Erro ao carregar cantinas.');
            } finally {
                setLoading(false);
            }
        };

        fetchCantinas();
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
            {cantinas.length === 0 ? (
                <Typography
                    variant="h6"
                    color="textSecondary"
                    textAlign="center"
                >
                    Nenhuma cantina cadastrada.
                </Typography>
            ) : (
                cantinas.map((cantina) => (
                    <CantinaCard key={cantina.id} cantina={cantina} />
                ))
            )}
        </Box>
    );
};
