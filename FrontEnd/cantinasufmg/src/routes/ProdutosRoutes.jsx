import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CadastrarProduto } from '../ui/pages/Produtos/CadastrarProduto';
import { ProdutosHome } from '../ui/pages/Produtos/ProdutosHome';

export const ProdutosRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProdutosHome />} />
            <Route path="cadastrar" element={<CadastrarProduto />} />
        </Routes>
    );
};
