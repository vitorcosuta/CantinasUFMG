import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    Alert,
    CircularProgress,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../routes/Routes';
import { createCantina } from '../../../../api/cantinaService';
import { SelectLocationModal } from '../../../modals/SelectLocationModal';
import { GoogleMapSelector } from '../../../components/maps/GoogleMapsLocationSelector';
import { getUser } from '../../../../api/userService';

export const CadastrarCantinaForm = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [posX, setPosX] = useState('');
    const [posY, setPosY] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const user = getUser();

    const validate = () => {
        return nome.trim() !== '' && posX !== '' && posY !== '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validate()) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        setLoading(true);
        try {
            await createCantina({
                nome,
                posX: Number(posX),
                posY: Number(posY),
                idOwner: user.id,
            });

            setSuccess('Cantina cadastrada com sucesso!');
            setTimeout(() => {
                setLoading(false);
                navigate(`${ROUTES.CANTINAS}${ROUTES.CANTINAS_HOME}`);
            }, 2000);
        } catch (err) {
            setError('Erro ao cadastrar cantina.');
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 300,
            }}
        >
            <Typography variant="h5" fontWeight="bold" textAlign="center">
                Cadastrar Cantina
            </Typography>

            <TextField
                label="Nome"
                value={nome}
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
            <Box display="flex" gap={2}>
                <TextField
                    label="Coordenada X"
                    value={posX}
                    onChange={(e) => setPosX(e.target.value)}
                    type="number"
                    sx={{
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
                    sx={{
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

            <Button
                sx={{
                    width: '100%',
                    mx: 'auto',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    paddingX: 3,
                    paddingY: 1,
                    backgroundColor: '#8E1616',
                }}
                type="submit"
                variant="contained"
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    'Cadastrar'
                )}
            </Button>

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
