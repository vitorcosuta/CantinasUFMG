import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { CommonDrawerHeader } from '../../components/common/CommonDrawerHeader';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Box } from '@mui/material';

export const Home = () => {
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const location = useLocation();
    const user =
        location.state?.user || JSON.parse(localStorage.getItem('user'));

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
                    <CommonDrawerHeader currentUser={user} />
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
                    <APIProvider apiKey={API_KEY}>
                        <Map
                            defaultZoom={16}
                            defaultCenter={{ lat: -19.87062, lng: -43.96675 }}
                            disableDefaultUI={true}
                            clickableIcons={false}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Marker
                                position={{ lat: -19.87062, lng: -43.96675 }}
                            />
                        </Map>
                    </APIProvider>
                </Box>
            </Box>
        </Fragment>
    );
};
