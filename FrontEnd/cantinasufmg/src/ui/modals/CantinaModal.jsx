import React from 'react';
import { Modal, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CantinaProdutoCard } from './components/CantinaProdutoCard';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '90vw',
    maxWidth: 800,
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: 24,
};

export const CantinaModal = ({ open, onClose, cantina }) => {
    if (!cantina) return null;

    return (
        <Modal
            open={open}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    onClose();
                }
            }}
        >
            <Box sx={modalStyle}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 2,
                        pt: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        {cantina.nome}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'calc(90vh - 90px)',
                        px: 2,
                        pb: 2,
                    }}
                >
                    <Box
                        sx={{
                            pb: 1,
                        }}
                    >
                        <Typography variant="h6">
                            Produtos Cadastrados:
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                pb: 1,
                            }}
                        >
                            {cantina.produtos.length === 0 ? (
                                <Typography
                                    variant="h6"
                                    color="textSecondary"
                                    textAlign="center"
                                >
                                    Nenhum produto cadastrado
                                </Typography>
                            ) : (
                                cantina.produtos.map((produto) => (
                                    <CantinaProdutoCard
                                        key={produto.id}
                                        produto={produto}
                                    />
                                ))
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
