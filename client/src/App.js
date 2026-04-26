import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import BakeACake from './pages/BakeACake';
import Desserts from './pages/Desserts';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Welcome />} />
                    <Route path='bakeacake' element={<BakeACake />} />
                    <Route path='desserts' element={<Desserts />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='orders' element={<Orders />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;