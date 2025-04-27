import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createUser } from '../../../../api/userService';
import { CommonFormInput } from '../../../components/common/CommonFormInput';
import { CommonPasswordFormInput } from '../../../components/common/CommonPasswordFormInput';

export const CadastrarUsuarioForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        emailInvalid: false,
        password: false,
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const getEmailHelperText = () => {
        if (errors.email) return 'E-mail é obrigatório';
        if (errors.emailInvalid) return 'Formato de e-mail inválido';
        return '';
    };

    const validateFields = () => {
        const isUsernameEmpty = username.trim() === '';
        const isEmailEmpty = email.trim() === '';
        const isPasswordEmpty = password.trim() === '';
        const isEmailInvalid = !isEmailEmpty && !validateEmail(email);

        const newErrors = {
            username: isUsernameEmpty,
            email: isEmailEmpty,
            emailInvalid: isEmailInvalid,
            password: isPasswordEmpty,
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(Boolean);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignUpError('');
        setSuccessMessage('');

        if (!validateFields()) {
            return;
        }

        setLoading(true);

        try {
            await createUser({ username, email, password });
            setSuccessMessage('Usuário cadastrado com sucesso!');
            setTimeout(() => {
                setLoading(false);
                navigate('/');
            }, 2000);
        } catch {
            setSignUpError('Erro ao cadastrar usuário. Tente novamente.');
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
                width: '100%',
                maxWidth: 300,
            }}
        >
            <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                color="#262423"
            >
                Cadastrar usuário
            </Typography>

            <CommonFormInput
                value={username}
                label="Nome"
                placeholder="Insira seu nome"
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                helperText={errors.username ? 'Nome é obrigatório' : ''}
            />

            <CommonFormInput
                value={email}
                label="E-mail"
                placeholder="Insira seu e-mail"
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email || errors.emailInvalid}
                helperText={getEmailHelperText()}
            />

            <CommonPasswordFormInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                helperText={errors.password ? 'Senha é obrigatória' : ''}
            />

            {signUpError && <Alert severity="error">{signUpError}</Alert>}
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
