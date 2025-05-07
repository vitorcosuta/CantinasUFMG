import React, { useState } from 'react';
import { editProduto } from '../../../../api/produtoService';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Alert } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { CommonFormInput } from '../../../components/common/CommonFormInput';
import { CommonFormTextbox } from '../../../components/common/CommonFormTextbox';

export const EditProdutoForm = ({ setOpen, produto }) => {
    const [nome, setNome] = useState(produto?.nome ?? '');
    const [descricao, setDescricao] = useState(produto?.descricao ?? '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        return nome.trim() !== '' && descricao.trim() !== '';
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
                id: produto.id,
                nome: nome,
                descricao: descricao,
                idOwner: produto.idOwner,
            };

            await editProduto(obj);

            setSuccess('Produto editado com sucesso!');
            setTimeout(() => {
                setLoading(false);
                setOpen(false);
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Erro ao editar produto.');
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
                margin: 'auto',
                gap: 7,
                width: '100%',
            }}
        >
            <Typography variant="h5" fontWeight="bold" textAlign="center">
                Editar produto
            </Typography>

            <CommonFormInput
                value={nome}
                label="Nome"
                placeholder="Nome do produto"
                onChange={(e) => setNome(e.target.value)}
            />

            <CommonFormTextbox
                value={descricao}
                label="Descrição"
                onChange={(e) => setDescricao(e.target.value)}
            />

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
        </Box>
    );
};
