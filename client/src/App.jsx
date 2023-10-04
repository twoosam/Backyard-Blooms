import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Catalog from './Catalog';
import Plumeria from './Plumeria';
import Carousel from './Carousel';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Carousel />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="/catalog/:categoryId" element={<Plumeria />} />
      </Route>
    </Routes>
  );
}
