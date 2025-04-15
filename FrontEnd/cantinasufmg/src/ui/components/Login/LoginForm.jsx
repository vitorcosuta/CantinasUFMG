import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonFormInput } from '../common/CommonFormInput';
import { CommonPasswordFormInput } from '../common/CommonPasswordFormInput';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { signInUser } from '../../../api/userService';

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

            localStorage.setItem('user', JSON.stringify(user));

            setTimeout(() => {
                setLoading(false);
                navigate('/home', { state: { user } });
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
                width: '20vw',
                backgroundColor: '#EEEEEE',
                padding: 2,
                borderRadius: 2,
                mt: '10%',
            }}
        >
            <Typography variant="h4" sx={{ color: '#262423' }}>
                Autenticar-se
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
                onClick={() => navigate('/cadastrarUsuario')}
            >
                Não possui conta? Cadastre-se!
            </Typography>

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
                    'Entrar'
                )}
            </Button>
        </Box>
    );
};
