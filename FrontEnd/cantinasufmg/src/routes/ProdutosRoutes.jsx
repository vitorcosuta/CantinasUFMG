import React from "react";
import { Routes, Route } from "react-router-dom"
import { CadastrarProduto } from "../ui/pages/Produtos/CadastrarProduto";

export const ProdutosRoutes = () => {

    return (
        <Routes>
            <Route path='cadastrar' element={<CadastrarProduto />} />
        </Routes>
    );
};