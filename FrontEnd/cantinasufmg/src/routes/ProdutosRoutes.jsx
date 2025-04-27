import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CadastrarProduto } from '../ui/pages/Produtos/CadastrarProduto';
import { ProdutosHome } from '../ui/pages/Produtos/ProdutosHome';
import { ROUTES } from './Routes';

export const ProdutosRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.PRODUTOS_HOME} element={<ProdutosHome />} />
            <Route
                path={ROUTES.PRODUTOS_CADASTRAR}
                element={<CadastrarProduto />}
            />
        </Routes>
    );
};
