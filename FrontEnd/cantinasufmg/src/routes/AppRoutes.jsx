import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../ui/pages/Home/Home';
import { ProdutosRoutes } from './ProdutosRoutes';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/produtos/*' element={<ProdutosRoutes />} />
    </Routes>
);

export default AppRoutes;