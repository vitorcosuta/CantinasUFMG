import React, { Fragment, useState } from 'react';
import { Card, CardContent, IconButton, Typography, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { EditCantinaForm } from './EditCantinaForm';

export const CantinaCard = ({ cantina }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick'){
            setOpen(false);
        }
    };

    return (
        <Fragment>
            <Card
                sx={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {cantina.nome}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Dono: {cantina.owner?.email}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Avaliação Média:{' '}
                                {cantina.avaliacaoMedia === 0
                                    ? 'Nenhuma avaliação'
                                    : cantina.avaliacaoMedia}
                            </Typography>
                        </Box>

                        <IconButton 
                            onClick={() => setOpen(true)}
                            sx={{ height: 40, width: 40 }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <EditCantinaForm setOpen={setOpen} cantina={cantina} />
                </Box>
            </Modal>
        </Fragment>
    );
};
