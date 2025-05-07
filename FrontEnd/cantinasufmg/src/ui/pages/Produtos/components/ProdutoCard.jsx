import React, { Fragment, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { EditProdutoForm } from './EditProdutoForm';

export const ProdutoCard = ({ produto }) => {

    const [open, setOpen] = useState(false);
    
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick'){
            setOpen(false);
        }
    };

    return (
        <Fragment>
            <Card
                sx={{
                    height: 120,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
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
                                {produto.nome}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Descrição: {produto.descricao}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Responsável pelo cadastro: {produto.owner?.email}
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
                    <EditProdutoForm setOpen={setOpen} produto={produto} />
                </Box>
            </Modal>
        </Fragment>
    );
};
