import React from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonHeaderItems } from '../consts/HeaderItens';

export const CommonHeaderItemsList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            {CommonHeaderItems.map((item) => {
                const isActive = location.pathname.startsWith(item.route);

                return (
                    <Button
                        key={item.id}
                        onClick={() => navigate(item.route)}
                        startIcon={item.icon}
                        sx={{
                            color: isActive ? '#D84040' : '#1D1616',
                            fontWeight: isActive ? 'bold' : 'normal',
                            fontSize: '1rem',
                            textTransform: 'none',
                            border: isActive
                                ? '2px solid #D84040'
                                : '2px solid transparent',
                            borderRadius: '12px',
                            backgroundColor: isActive
                                ? '#FDECEC'
                                : 'transparent',
                            px: 2,
                            py: 1,
                            gap: 1,
                        }}
                    >
                        {item.label}
                    </Button>
                );
            })}
        </>
    );
};
