import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createProduto } from '../../../../api/produtoService';
import { CommonFormInput } from '../../../components/common/CommonFormInput';

export const CadastrarProdutoForm = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [errors, setErrors] = useState({
        nome: false,
        descricao: false,
    });

    const validateFields = () => {
        const isNomeEmpty = nome.trim() === '';
        const isDescricaoEmpty = descricao.trim() === '';

        const newErrors = {
            nome: isNomeEmpty,
            descricao: isDescricaoEmpty,
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!validateFields()) return;

        setLoading(true);

        try {
            await createProduto({ nome, descricao });
            setSuccessMessage('Produto cadastrado com sucesso!');
            setTimeout(() => {
                setLoading(false);
                navigate('/produtos');
            }, 2000);
        } catch {
            setError('Erro ao cadastrar produto. Tente novamente.');
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
                width: '20vw',
                backgroundColor: '#EEEEEE',
                padding: 2,
                borderRadius: 2,
                mt: '10%',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    whiteSpace: 'pre-line',
                    color: '#262423',
                }}
            >
                Cadastrar produto
            </Typography>

            <CommonFormInput
                value={nome}
                label="Nome"
                placeholder="Nome do produto"
                onChange={(e) => setNome(e.target.value)}
                error={errors.nome}
                helperText={errors.nome ? 'Nome é obrigatório' : ''}
            />

            <CommonFormInput
                value={descricao}
                label="Descrição"
                placeholder="Descrição do produto"
                onChange={(e) => setDescricao(e.target.value)}
                error={errors.descricao}
                helperText={errors.descricao ? 'Descrição é obrigatória' : ''}
            />

            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && (
                <Alert severity="success">{successMessage}</Alert>
            )}

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
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    'Cadastrar'
                )}
            </Button>
        </Box>
    );
};
