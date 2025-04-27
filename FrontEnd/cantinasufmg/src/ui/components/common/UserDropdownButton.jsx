import React, { useState } from 'react';
import {
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    CircularProgress,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../../api/userService';

export const UserDropdownButton = ({ currentUser }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loadingLogout, setLoadingLogout] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditUser = () => {
        //TODO

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
            <Button
                variant="contained"
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    backgroundColor: '#D84040',
                    color: '#fff',
                    px: 3,
                    py: 1,
                }}
            >
                Área do Usuário
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: anchorEl ? anchorEl.offsetWidth : 'auto',
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
                            px: 2,
                            py: 1,
                            borderBottom: '1px solid #ccc',
                            mb: 1,
                            maxWidth: anchorEl ? anchorEl.offsetWidth : 'auto',
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
        </>
    );
};
