import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import { CommonLogoHeader } from '../../components/common/CommonLogoHeader';
import { LoginForm } from './components/LoginForm';

export const Login = () => {
    return (
        <Fragment>
            <CommonLogoHeader />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 'calc(100vh - 120px)',
                }}
            >
                <LoginForm />
            </Box>
        </Fragment>
    );
};
