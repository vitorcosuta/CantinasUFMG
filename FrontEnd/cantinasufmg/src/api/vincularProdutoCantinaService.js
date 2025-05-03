import httpClient from './httpClient';

const route = '/produtolanchonete';

export const vincularProdutoCantina = async ({
    idProduto,
    idLanchonete,
    preco,
}) => {
    return httpClient.post(route, {
        idProduto,
        idLanchonete,
        preco,
    });
};
