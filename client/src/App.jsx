import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Catalog from './Catalog';
import Products from './Plumeria';
import Carousel from './Carousel';
import NotFound from './NotFound';
import ProductsDetails from './ProductDetails';
import Cart from './Cart';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Carousel />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="cart" element={<Cart />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="/catalog/:categoryId" element={<Products />} />
        <Route
          path="/catalog/:categoryId/:productId"
          element={<ProductsDetails />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
