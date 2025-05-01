import React from 'react';
import MapIcon from '@mui/icons-material/Map';
import StoreIcon from '@mui/icons-material/Store';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { ROUTES } from '../../../routes/Routes';

export const CommonHeaderItems = [
    {
        id: 0,
        icon: <StoreIcon />,
        label: 'Cantinas',
        route: ROUTES.CANTINAS,
        adminOnly: true,
    },
    {
        id: 1,
        icon: <MapIcon />,
        label: 'Mapa',
        route: ROUTES.HOME,
        adminOnly: false,
    },
    {
        id: 2,
        icon: <FastfoodIcon />,
        label: 'Produtos',
        route: ROUTES.PRODUTOS,
        adminOnly: true,
    },
];
