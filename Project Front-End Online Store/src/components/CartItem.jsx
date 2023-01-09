import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartItem extends Component {
  handleIncreaseOrDecrease = (decreaseOnIncrease) => {
    const { id, update, availableQuantity } = this.props;

    const currentLocalStorage = JSON.parse(localStorage.getItem('cartItems'));

    const indexOfExistent = currentLocalStorage
      .findIndex((cartItems) => cartItems.id === id);

    const currentQuantity = currentLocalStorage[indexOfExistent].quantity;
    if (decreaseOnIncrease === 'increase'
    && currentLocalStorage[indexOfExistent].quantity < availableQuantity) {
      currentLocalStorage[indexOfExistent].quantity += 1;
    }
    if (decreaseOnIncrease === 'decrease' && currentQuantity > 1) {
      currentLocalStorage[indexOfExistent].quantity -= 1;
    }

    localStorage.setItem('cartItems', JSON.stringify(currentLocalStorage));
    update();
  };

  handleDeleteCartItem = () => {
    const { id, update } = this.props;

    const currentLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    const filteredLocalStorage = currentLocalStorage
      .filter((cartItems) => cartItems.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(filteredLocalStorage));
    update();
  };

  render() {
    const { title, quantity } = this.props;

    return (
      <div className="flex flex-col justify-center items-center mt-5 ">
        <p
          className=" mt-3 leading-5 text-blue-900 text-2xl"
          data-testid="shopping-cart-product-name"
        >
          { title }

        </p>
        <p
          className=" mt-3 leading-5 text-blue-900 text-2xl"
          data-testid="shopping-cart-product-quantity"
        >
          { quantity }

        </p>
        <div className="flex mt-3  ">
          <button
            className=" mt-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
            hover:text-white border border-blue-500 hover:border-transparent rounded"
            type="button"
            data-testid="product-increase-quantity"
            onClick={ () => this.handleIncreaseOrDecrease('increase') }
          >
            +
          </button>
          <button
            className="mt-3 ml-3 bg-transparent hover:bg-blue-500 text-blue-700
            font-semibold hover:text-white border border-blue-500
             hover:border-transparent rounded"
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ () => this.handleIncreaseOrDecrease('decrease') }
          >
            -
          </button>
          <button
            className=" ml-3 mt-3  bg-transparent hover:bg-blue-500
            text-blue-700 font-semibold hover:text-white border border-blue-500
            hover:border-transparent rounded"
            type="button"
            data-testid="remove-product"
            onClick={ this.handleDeleteCartItem }
          >
            Remover
          </button>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  availableQuantity: PropTypes.number.isRequired,
};

export default CartItem;
