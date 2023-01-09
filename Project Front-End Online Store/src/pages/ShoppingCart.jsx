// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CartItem from '../components/CartItem';
import '../shoppingCart.css';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
    goToCheckout: false,
  };

  componentDidMount() {
    this.refreshCartitems();
  }

  updateChild = () => {
    this.refreshCartitems();
  };

  refreshCartitems = () => {
    const currentLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({ cartItems: currentLocalStorage });
  };

  handleCheckout = () => {
    this.setState({
      goToCheckout: true,
    });
  };

  render() {
    const { cartItems, goToCheckout } = this.state;
    console.log(cartItems);
    return (
      <div className="flex flex-col justify-center bg-sky-200 ">
        <h1 className="self-center text-blue-600 text-3xl">Compras</h1>
        { cartItems.length === 0 ? (
          <p
            data-testid="shopping-cart-empty-message"
            className="self-center text-red-600 text-3xl"
          >
            Seu carrinho está vazio
          </p>
        ) : (
          cartItems.map((cartItem) => (<CartItem
            key={ cartItem.id }
            { ...cartItem }
            update={ this.updateChild }
          />
          ))
        )}
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.handleCheckout }
          className="self-center
        w-96 mt-10 bg-transparent hover:bg-red-500
        text-red-700 font-semibold hover:text-white
        border border-red-500 hover:border-transparent rounded"
        >
          Fechar compra

        </button>
        { goToCheckout && <Redirect to="/checkout" /> }
      </div>
    );
  }
}

// ShoppingCart.propTypes = {
// second: third
// };

export default ShoppingCart;
