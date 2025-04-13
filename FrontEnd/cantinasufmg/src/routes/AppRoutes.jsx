import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../ui/pages/Home/Home';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Home />} />
    </Routes>
);

export default AppRoutes;