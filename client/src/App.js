import React from 'react';
import  {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './pages/Welcome';
import Menu from './pages/Menu'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Welcome />} />
        <Route path = '/menu' element={<Menu />} />
        <Route path = '*' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;