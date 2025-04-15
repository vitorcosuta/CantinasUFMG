import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../ui/pages/Home/Home';
import { Login } from '../ui/pages/Login/Login';
import { CadastrarUsuario } from '../ui/pages/User/CadastrarUsuario';
import { ProdutosRoutes } from './ProdutosRoutes';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrarUsuario" element={<CadastrarUsuario />} />
        <Route path="/home" element={<Home />} />
        <Route path='/produtos/*' element={<ProdutosRoutes />} />
    </Routes>
);

export default AppRoutes;
