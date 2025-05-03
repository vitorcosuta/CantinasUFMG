import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './Routes';
import { CantinasHome } from '../ui/pages/Cantinas/CantinasHome';
import { CadastrarCantina } from '../ui/pages/Cantinas/CadastrarCantina';

export const CantinasRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.CANTINAS_HOME} element={<CantinasHome />} />
            <Route
                path={ROUTES.CANTINAS_CADASTRAR}
                element={<CadastrarCantina />}
            />
        </Routes>
    );
};
