import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ForbiddenError = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#EEEEEE',
            }}
        >
            <Typography variant="h3" color="error" gutterBottom>
                Error 403
            </Typography>
            <Typography variant="h6" color="textSecondary">
                Você não tem permissão para acessar esta página.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/home"
                sx={{
                    marginTop: 2,
                    borderRadius: '999px',
                    paddingX: 3,
                    paddingY: 1,
                }}
            >
                Voltar para a página inicial
            </Button>
        </Box>
    );
};

export default ForbiddenError;
