import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

export const CommonLogoHeader = () => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#EEEEEE',
            }}
        >
            <Toolbar>
                <Box
                    component="img"
                    src="/logo.png"
                    alt="Logo"
                    sx={{ height: 120, ml: '20vw' }}
                />
            </Toolbar>
        </AppBar>
    );
};
