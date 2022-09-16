import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Layout from './components/layout/Layout';
import Product from './components/pages/Product';
import ProductManag from './components/pages/adminka/ProductManag';
import Vk from './components/pages/Vk';
import FilterManag from './components/pages/adminka/FilterManag';
import CategoryManag from './components/pages/adminka/CategoryManag';
import BrandManag from './components/pages/adminka/BrandManag';
import Yandex from './components/pages/Yandex';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/category/:id" element={<Home />} />
          <Route path="/:about" element={<About />} />
          <Route path="/product/:id" element={<Product />} />
          

          <Route path="adminbar/productManag" element={<ProductManag />} />
          <Route path="adminbar/filterManag" element={<FilterManag />} />
          <Route path="adminbar/categoryManag" element={<CategoryManag />} />
          <Route path="adminbar/brandManag" element={<BrandManag />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
