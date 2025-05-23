import React, { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { UserDropdownButton } from './UserDropdownButton';
import { CommonHeaderItemsList } from './CommonHeaderItemsList';

export const CommonHeader = () => {
    return (
        <Fragment>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            width: '350px',
                            alignItems: 'center',
                            gap: 2,
                            padding: '8px 0px',
                        }}
                    >
                        <Box
                            component="img"
                            src="/logo.png"
                            alt="Logo"
                            sx={{ height: 60 }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'center',
                            gap: 4,
                        }}
                    >
                        <CommonHeaderItemsList />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            width: '350px',
                            justifyContent: 'end',
                            gap: 2,
                            padding: '8px 0px',
                        }}
                    >
                        <UserDropdownButton />
                    </Box>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
};
