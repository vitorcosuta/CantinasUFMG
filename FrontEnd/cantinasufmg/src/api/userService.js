import httpClient from './httpClient';

const route = '/user';

export const createUser = (user) => {
    return httpClient.post(route, user);
};

export const signInUser = (user) => {
    return httpClient.post(`${route}/AssertUser`, user);
};

export const updateUser = (user) => {
    return httpClient.put(route, user);
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
};

export const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null;
};

export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.isAdmin;
};

export const removeUser = () => {
    localStorage.removeItem('user');
};

export const logout = () => {
    removeUser();
    window.location.href = '/';
};
