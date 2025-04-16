import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import { CadastrarProdutoForm } from './components/CadastrarProdutoForm';
import { CommonDrawerHeader } from '../../components/common/CommonDrawerHeader';
import { useLocation } from 'react-router-dom';

export const CadastrarProduto = () => {
    const location = useLocation();
    const user =
        location.state?.user || JSON.parse(localStorage.getItem('user'));

    return (
        <Fragment>
            <CommonDrawerHeader currentUser={user} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 'calc(100vh - 120px)',
                }}
            >
                <CadastrarProdutoForm />
            </Box>
        </Fragment>
    );
};
