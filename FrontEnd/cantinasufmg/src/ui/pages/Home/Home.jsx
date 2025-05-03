import React, { useEffect, useState, Fragment } from 'react';
import { Box } from '@mui/material';
import { CommonHeader } from '../../components/common/CommonHeader';
import { GoogleMapsView } from '../../components/maps/GoogleMapsView';
import { getCantinas } from '../../../api/cantinaService';
import { CantinaModal } from '../../modals/CantinaModal';

export const Home = () => {
    const [cantinas, setCantinas] = useState([]);
    const [selectedCantina, setSelectedCantina] = useState(null);

    useEffect(() => {
        const fetchCantinas = async () => {
            try {
                const response = await getCantinas();
                setCantinas(response.data);
            } catch (error) {
                console.error('Erro ao buscar cantinas', error);
            }
        };
        fetchCantinas();
    }, []);

    return (
        <Fragment>
            <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
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
                    <GoogleMapsView
                        cantinas={cantinas}
                        onMarkerClick={(cantina) => setSelectedCantina(cantina)}
                    />
                </Box>

                <CantinaModal
                    open={!!selectedCantina}
                    onClose={() => setSelectedCantina(null)}
                    cantina={selectedCantina}
                />
            </Box>
        </Fragment>
    );
};
