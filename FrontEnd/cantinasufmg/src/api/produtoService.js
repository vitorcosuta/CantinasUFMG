import httpClient from './httpClient';

const route = '/produto';

export const getProdutos = () => {
    return httpClient.get(route);
};

export const createProduto = (produto) => {
    return httpClient.post(route, produto);
};
