import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import { CadastrarProdutoForm } from './components/CadastrarProdutoForm';
import { CommonHeader } from '../../components/common/CommonHeader';

export const CadastrarProduto = () => {
    return (
        <Fragment>
            <CommonHeader />
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
