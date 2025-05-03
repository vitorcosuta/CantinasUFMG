import httpClient from './httpClient';

const route = '/lanchonete';

export const getCantinas = () => {
    return httpClient.get(route);
};

export const createCantina = (cantina) => {
    return httpClient.post(route, cantina);
};
