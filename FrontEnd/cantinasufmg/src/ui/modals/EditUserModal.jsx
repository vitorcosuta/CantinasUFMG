import React from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Button,
    Divider,
    Alert,
    Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CommonFormInput } from '../components/common/CommonFormInput';
import { CommonPasswordFormInput } from '../components/common/CommonPasswordFormInput';
import { setUser, updateUser } from '../../api/userService';
import { defaultUserIcon } from '../../assets/defaultUserIcon';
import { CommonImgUploadButton } from '../components/common/CommonImgUploadButton';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '90vw',
    maxWidth: 600,
    maxHeight: '90vh',
    boxShadow: 24,
};

export const EditUserModal = ({ open, setOpen, user }) => {
    const [username, setUsername] = React.useState(user?.username || '');
    const [email, setEmail] = React.useState(user?.email || '');
    const [photo, setPhoto] = React.useState(user?.photo || defaultUserIcon);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [submitAttempted, setSubmitAttempted] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');

    const handleSave = async () => {
        setSubmitAttempted(true);

        if (currentPassword.trim() === '') return;

        const userToUpdate = {
            id: user.id,
            newUsername: username !== user.username ? username : null,
            password: currentPassword,
            newPassword: newPassword !== '' ? newPassword : null,
            photo: photo,
        };

        try {
            const response = await updateUser(userToUpdate);

            const updatedUser = response.data;

            setUser(updatedUser);
            setErrorMsg('');
            setSuccessMsg('Usuário atualizado com sucesso!');
        } catch (error) {
            setSuccessMsg('');
            error.response && error.response.status === 403
                ? setErrorMsg('Senha atual incorreta.')
                : setErrorMsg('Erro ao atualizar usuário.');
        }
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setPhoto(user?.photo || defaultUserIcon);
            setOpen(false);
        }
    };

    React.useEffect(() => {
        if (open) {
            setUsername(user?.username || '');
            setEmail(user?.email || '');
            setCurrentPassword('');
            setNewPassword('');
            setSubmitAttempted(false);
            setErrorMsg('');
            setSuccessMsg('');
        }
    }, [user, open]);

    return (
        <Modal open={open} onClose={handleClose}>
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
                    <Typography variant="h6" fontWeight="bold">
                        Editar Usuário
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'calc(90vh - 90px)',
                        px: 2,
                        pb: 2,
                    }}
                >
                    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                                mt: 2,
                            }}
                        >
                            <Avatar
                                src={photo}
                                alt={username}
                                sx={{
                                    width: '150px',
                                    height: '150px',
                                    margin: 'auto',
                                }}
                            />

                            <CommonImgUploadButton setPhoto={setPhoto}>
                                Carregar imagem de perfil
                            </CommonImgUploadButton>

                            <CommonFormInput
                                value={username}
                                label="Nome"
                                placeholder="Insira seu nome"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <CommonFormInput
                                value={email}
                                label="E-mail"
                                placeholder="Insira seu e-mail"
                                onChange={(e) => setEmail(e.target.value)}
                                disabled
                            />
                            <CommonPasswordFormInput
                                value={currentPassword}
                                label="Senha atual"
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                error={
                                    submitAttempted &&
                                    currentPassword.trim() === ''
                                }
                                helperText={
                                    submitAttempted &&
                                    currentPassword.trim() === ''
                                        ? 'A senha atual é obrigatória.'
                                        : ''
                                }
                            />
                            <CommonPasswordFormInput
                                value={newPassword}
                                label="Nova senha (opcional)"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            {errorMsg && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {errorMsg}
                                </Alert>
                            )}
                            {successMsg && (
                                <Alert severity="success" sx={{ mt: 2 }}>
                                    {successMsg}
                                </Alert>
                            )}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            pt: 2,
                        }}
                    >
                        <Button
                            onClick={handleClose}
                            sx={{
                                color: '#D84040',
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                borderRadius: '5px',
                                backgroundColor: '#D84040',
                                color: '#fff',
                                px: 2,
                                py: 1,
                            }}
                        >
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};
