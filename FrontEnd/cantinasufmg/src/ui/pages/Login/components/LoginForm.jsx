import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { setUser, signInUser } from '../../../../api/userService';
import { CommonFormInput } from '../../../components/common/CommonFormInput';
import { CommonPasswordFormInput } from '../../../components/common/CommonPasswordFormInput';
import { ROUTES } from '../../../../routes/Routes';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError('');

        try {
            const response = await signInUser({ email, password });
            const user = response.data;

            setUser(user);

            setTimeout(() => {
                setLoading(false);
                navigate(ROUTES.HOME, { state: { user } });
            }, 2000);
        } catch (error) {
            error.response && error.response.status === 403
                ? setLoginError('Usuário ou senha inválidos.')
                : setLoginError('Erro ao autenticar. Tente novamente.');

            setLoading(false);
        }
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

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
                Bem vindo!
            </Typography>

            <CommonFormInput
                value={email}
                label={'E-mail'}
                placeholder={'Insira seu e-mail'}
                onChange={handleEmailChange}
            />

            <CommonPasswordFormInput
                value={password}
                onChange={handlePasswordChange}
            />

            {loginError && <Alert severity="error">{loginError}</Alert>}

            <Typography
                variant="body2"
                sx={{
                    color: '#262423',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    textAlign: 'center',
                }}
                onClick={() => navigate(ROUTES.CADASTRAR_USUARIO)}
            >
                Não possui conta? Cadastre-se!
            </Typography>

            <Button
                sx={{
                    width: '100%',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    py: 1.5,
                    backgroundColor: '#8E1616',
                }}
                type="submit"
                variant="contained"
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    'Entrar'
                )}
            </Button>
        </Box>
    );
};
