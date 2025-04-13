import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../ui/pages/Home/Home';
import { Login } from '../ui/pages/Login/Login';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
    </Routes>
);

export default AppRoutes;