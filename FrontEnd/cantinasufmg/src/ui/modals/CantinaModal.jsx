import React from 'react';
import { Modal, Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CantinaCard } from '../pages/Cantinas/components/CantinaCard';

export const CantinaModal = ({ open, onClose, cantina }) => {
    if (!cantina) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 2,
                    width: { xs: '90%', sm: 400 },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6">{cantina.nome}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />
                <CantinaCard cantina={cantina} />
            </Box>
        </Modal>
    );
};
