import React, { Fragment } from 'react';
import { Box } from '@mui/material';
// import { getUser } from '../../../api/userService';
import { CommonHeader } from '../../components/common/CommonHeader';
import { GoogleMapsView } from '../../components/maps/GoogleMapsView';

export const Home = () => {
    // const user = getUser();

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
                    <GoogleMapsView
                        markers={[{ lat: -19.87062, lng: -43.96675 }]}
                    />
                </Box>
            </Box>
        </Fragment>
    );
};
