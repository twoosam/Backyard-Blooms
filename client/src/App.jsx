import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Catalog from './Catalog';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Catalog />} />
      </Route>
    </Routes>
  );
}
