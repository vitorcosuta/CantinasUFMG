import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    CircularProgress,
    Avatar,
    Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { getUser, logout } from '../../../api/userService';
import { EditUserModal } from '../../modals/EditUserModal';
import { defaultUserIcon } from '../../../assets/defaultUserIcon';

export const UserDropdownButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loadingLogout, setLoadingLogout] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const currentUser = getUser();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditUser = () => {
        setEditModalOpen(true);
        handleClose();
    };

    const handleLogout = () => {
        setLoadingLogout(true);

        setTimeout(() => {
            setLoadingLogout(false);
            handleClose();
            logout();
        }, 1500);
    };

    return (
        <>
            <Avatar
                src={currentUser?.photo ?? defaultUserIcon}
                onClick={handleClick}
                sx={{
                    cursor: 'pointer'
                }}
            />

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        minWidth: 200,
                        maxWidth: 300,
                        backgroundColor: '#EEEEEE',
                        borderRadius: '8px',
                    },
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {currentUser && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            noWrap
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                color: '#333',
                            }}
                        >
                            {currentUser.username}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            noWrap
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontSize: '0.8rem',
                            }}
                        >
                            {currentUser.email}
                        </Typography>

                        <Divider 
                            variant='middle'
                            sx={{ width: '100%', mt: 1, mb: 1 }}
                        />
                    </Box>
                )}

                <MenuItem onClick={handleEditUser}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Editar Usuário" />
                </MenuItem>
                <MenuItem onClick={handleLogout} disabled={loadingLogout}>
                    <ListItemIcon>
                        {loadingLogout ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <LogoutIcon fontSize="small" />
                        )}
                    </ListItemIcon>
                    <ListItemText
                        primary={loadingLogout ? 'Saindo...' : 'Sair'}
                        sx={{ ml: 1 }}
                    />
                </MenuItem>
            </Menu>

            <EditUserModal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                user={currentUser}
            />
        </>
    );
};
