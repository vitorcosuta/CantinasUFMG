import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../ui/pages/Home/Home';
import { Login } from '../ui/pages/Login/Login';
import { CadastrarUsuario } from '../ui/pages/User/CadastrarUsuario';
import { ProdutosRoutes } from './ProdutosRoutes';
import { PrivateRoute } from './PrivateRoute';
import { ROUTES } from './Routes';

const AppRoutes = () => (
    <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.CADASTRAR_USUARIO} element={<CadastrarUsuario />} />
        <Route
            path={ROUTES.HOME}
            element={<PrivateRoute element={<Home />} />}
        />
        <Route
            path={`${ROUTES.PRODUTOS}/*`}
            element={<PrivateRoute element={<ProdutosRoutes />} />}
        />
    </Routes>
);

export default AppRoutes;
