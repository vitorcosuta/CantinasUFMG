import React, { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import {
    getAPI_KEY,
    UFMG_DEFAULT_CENTER,
} from '../../../api/googleMapsService';
import { Box, Button } from '@mui/material';

export const GoogleMapSelector = ({ onSave, initialPosition }) => {
    const apiKey = getAPI_KEY();
    const [selectedPosition, setSelectedPosition] = useState(
        initialPosition || null
    );

    const handleClick = (e) => {
        const { latLng } = e.detail;
        setSelectedPosition({
            lat: latLng.lat,
            lng: latLng.lng,
        });
    };

    return (
        <APIProvider apiKey={apiKey}>
            <Box
                sx={{
                    width: '100%',
                    height: '600px',
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <Map
                    defaultZoom={16}
                    defaultCenter={initialPosition || UFMG_DEFAULT_CENTER}
                    disableDefaultUI={true}
                    clickableIcons={false}
                    onClick={handleClick}
                    style={{ width: '100%', height: '100%' }}
                >
                    {selectedPosition && <Marker position={selectedPosition} />}
                </Map>

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            selectedPosition && onSave(selectedPosition)
                        }
                        disabled={!selectedPosition}
                        sx={{
                            borderRadius: 2,
                            bgcolor: !selectedPosition ? 'grey.400' : '#D84040',
                            color: 'white',
                            '&.Mui-disabled': {
                                bgcolor: 'grey.400',
                                color: 'white',
                            },
                        }}
                    >
                        Salvar Posição
                    </Button>
                </Box>
            </Box>
        </APIProvider>
    );
};
