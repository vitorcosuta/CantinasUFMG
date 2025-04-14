import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import { CommonLogoHeader } from '../../components/common/CommonLogoHeader';
import { NewUserForm } from '../../components/User/NewUserForm';

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
                <NewUserForm />
            </Box>
        </Fragment>
    );
};
