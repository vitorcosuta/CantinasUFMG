import React from 'react';
import MapIcon from '@mui/icons-material/Map';
import StoreIcon from '@mui/icons-material/Store';
import FastfoodIcon from '@mui/icons-material/Fastfood';

export const commonUserNavbarItems = [
    {
        id: 0,
        icon: <MapIcon />,
        label: 'Mapa',
        route: '/home',
    },
    {
        id: 1,
        icon: <StoreIcon />,
        label: 'Cantinas',
        route: '/cantinas',
    },
    {
        id: 2,
        icon: <FastfoodIcon />,
        label: 'Produtos',
        route: '/produtos',
    },
];

export const adminNavbarItems = [];
