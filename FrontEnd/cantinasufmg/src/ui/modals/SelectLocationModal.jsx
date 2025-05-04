import React from 'react';
import { Box, Modal, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

export const SelectLocationModal = ({
    open,
    onClose,
    title = 'Clique para selecionar a localização',
    children,
}) => {
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
                    <Typography variant="h6">{title}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ px: 2, py: 1 }}>{children}</Box>
            </Box>
        </Modal>
    );
};
