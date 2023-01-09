import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import './tailwind.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Home } />
      <Route path="/shoppingCart" component={ ShoppingCart } />
      <Route
        path="/productDetails/:id"
        render={
          (props) => <ProductDetails { ...props } />
        }
      />
      <Route path="/checkout" component={ Checkout } />
    </div>
  );
}

export default App;
