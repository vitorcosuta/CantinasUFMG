import React, { useState } from 'react';
import { editCantina } from '../../../../api/cantinaService';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import { Alert } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { CommonFormInput } from '../../../components/common/CommonFormInput';
import { SelectLocationModal } from '../../../modals/SelectLocationModal';
import { GoogleMapSelector } from '../../../components/maps/GoogleMapsLocationSelector';

export const EditCantinaForm = ({ setOpen, cantina }) => {
    const [nome, setNome] = useState(cantina?.nome ?? '');
    const [posX, setPosX] = useState(cantina?.posX ?? '');
    const [posY, setPosY] = useState(cantina?.posY ?? '');
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        return nome.trim() !== '' && posX !== '' && posY !== '';
    };

    const handleSubmit = async (e) => {
        setError('');
        setSuccess('');

        if (!validate()) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        setLoading(true);

        try {
            const obj = {
                id: cantina.id,
                nome: nome,
                posX: Number(posX),
                posY: Number(posY),
                idOwner: cantina.idOwner,
            };

            await editCantina(obj);

            setSuccess('Cantina editada com sucesso!');
            setTimeout(() => {
                setLoading(false);
                setOpen(false);
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Erro ao editar cantina.');
            setLoading(false);
        }
    };

    const handleCancelClick = () => setOpen(false);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                margin: 'auto',
            }}
        >
            <Typography variant="h5" fontWeight="bold" textAlign="center">
                Editar cantina
            </Typography>

            <CommonFormInput
                value={nome}
                label="Nome"
                placeholder="Nome da cantina"
                onChange={(e) => setNome(e.target.value)}
            />

            <Typography variant="subtitle1" fontWeight="bold">
                Localização:
            </Typography>

            <Button
                variant="outlined"
                onClick={() => setModalOpen(true)}
                sx={{
                    color: '#D84040',
                    borderColor: '#D84040',
                    '&:hover': {
                        backgroundColor: '#8E161611',
                        borderColor: '#8E1616',
                    },
                }}
            >
                Selecionar Posição no Mapa
            </Button>

            <Box display="flex" alignItems="center" gap={2} width="100%">
                <Divider sx={{ flex: 1 }} />
                <Typography variant="body2" color="text.secondary">
                    ou
                </Typography>
                <Divider sx={{ flex: 1 }} />
            </Box>

            <Typography
                variant="body2"
                alignSelf="center"
                fontWeight="bold"
                color="#D84040"
            >
                Digite as coordenadas:
            </Typography>
            <Box display="flex" gap={2} alignItems="center">
                <TextField
                    label="Coordenada X"
                    value={posX}
                    onChange={(e) => setPosX(e.target.value)}
                    type="number"
                    fullWidth
                    sx={{
                        flex: 1,
                        '& input[type=number]': {
                            MozAppearance: 'textfield',
                        },
                        '& input[type=number]::-webkit-outer-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0,
                        },
                        '& input[type=number]::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0,
                        },
                    }}
                />
                <TextField
                    label="Coordenada Y"
                    value={posY}
                    onChange={(e) => setPosY(e.target.value)}
                    type="number"
                    fullWidth
                    sx={{
                        flex: 1,
                        '& input[type=number]': {
                            MozAppearance: 'textfield',
                        },
                        '& input[type=number]::-webkit-outer-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0,
                        },
                        '& input[type=number]::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0,
                        },
                    }}
                />
            </Box>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: 2,
                }}
            >
                <Button
                    sx={{
                        color: '#D84040',
                    }}
                    onClick={handleCancelClick}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        borderRadius: '5px',
                        backgroundColor: '#D84040',
                        color: '#fff',
                        px: 2,
                        py: 1,
                    }}
                >
                    {loading ? (
                        <CircularProgress size={24} color="#EEEEEE" />
                    ) : (
                        'Salvar'
                    )}
                </Button>
            </Box>

            <SelectLocationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <GoogleMapSelector
                    onSave={(position) => {
                        setPosX(position.lat.toFixed(5));
                        setPosY(position.lng.toFixed(5));
                        setModalOpen(false);
                    }}
                />
            </SelectLocationModal>
        </Box>
    );
};
