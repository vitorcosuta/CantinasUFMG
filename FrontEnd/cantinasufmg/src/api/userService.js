import httpClient from './httpClient';

const route = '/user';

export const getUsers = () => {
    return httpClient.get(route);
};

export const createUser = (user) => {
    return httpClient.post(route, user);
};

export const signInUser = (user) => {
    return httpClient.post(`${route}/AssertUser`, user);
};
