import React from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonHeaderItems } from '../consts/HeaderItens';

export const CommonHeaderItemsList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            {CommonHeaderItems.map((item) => (
                <Button
                    key={item.id}
                    onClick={() => navigate(item.route)}
                    startIcon={item.icon}
                    sx={{
                        color:
                            location.pathname === item.route
                                ? '#D84040'
                                : '#1D1616',
                        fontWeight:
                            location.pathname === item.route
                                ? 'bold'
                                : 'normal',
                        fontSize: '1rem',
                        textTransform: 'none',
                        border:
                            location.pathname === item.route
                                ? '2px solid #D84040'
                                : '2px solid transparent',
                        borderRadius: '12px',
                        backgroundColor:
                            location.pathname === item.route
                                ? '#FDECEC'
                                : 'transparent',
                        px: 2,
                        py: 1,
                        gap: 1,
                    }}
                >
                    {item.label}
                </Button>
            ))}
        </>
    );
};
