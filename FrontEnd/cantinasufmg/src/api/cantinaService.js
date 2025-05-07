import httpClient from './httpClient';

const route = '/lanchonete';
const updateRoute = '/Lanchonete/UpdateLanchonete';

export const getCantinas = () => {
    return httpClient.get(route);
};

export const createCantina = (cantina) => {
    return httpClient.post(route, cantina);
};

export const editCantina = (cantina) => {
    return httpClient.post(updateRoute, cantina);
};