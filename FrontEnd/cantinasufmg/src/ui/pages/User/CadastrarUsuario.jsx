import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import { CommonLogoHeader } from '../../components/common/CommonLogoHeader';
import { SignUpUserForm } from '../../components/User/SignUpUserForm';

export const CadastrarUsuario = () => {
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
                <SignUpUserForm />
            </Box>
        </Fragment>
    );
};
