import httpClient from './httpClient';

const route = '/produto';
const updateRoute = '/Produto/UpdateProduto';

export const getProdutos = () => {
    return httpClient.get(route);
};

export const createProduto = (produto) => {
    return httpClient.post(route, produto);
};

export const editProduto = (produto) => {
    return httpClient.post(updateRoute, produto);
};