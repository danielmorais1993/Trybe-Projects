import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleAddToCart } from '../services/api';
// import

class Products extends Component {
  render() {
    const { title, price, thumbnail, id, shoppingCartQuantitySum,
      available_quantity: availableQuantity, shipping } = this.props;
    const { free_shipping: freteGratis } = shipping;

    return (
      <div
        data-testid="product"
        className="flex flex-col justify-between  w-48 h-96
        content-evenly items-evenly max-w-sm
         rounded overflow-hidden shadow-lg space-x-1
         space-y-1 max-h-full cd-un shadow-2xl"
      >
        <Link
          className="flex flex-col justify-center items-center cd-un max-w-sm max-h-full "
          to={ `/productDetails/${id}` }
          data-testid="product-detail-link"
        >
          <img
            className="w-48 h-48"
            alt={ title }
            src={ thumbnail }
          />
          <h1
            className="font-bold text-xl mb-2 text-xs"
          >
            { title }

          </h1>

          {
            freteGratis
            && (
              <p
                className="text-gray-900 bg-gradient-to-r from-lime-200
            via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4
            focus:outline-none
            focus:ring-lime-300 dark:focus:ring-lime-800 f
            ont-medium rounded-lg text-sm px-5 py-2.5
            text-center mr-2 mb-2"
                data-testid="free-shipping"
              >
                Frete grátis
              </p>
            )
          }
          <p className="mt-4 text-sky-700 ">{ price }</p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          className=" bg-transparent hover:bg-blue-500 text-blue-700
          font-semibold hover:text-white border border-blue-500
          hover:border-transparent rounded"
          type="button"
          onClick={ () => {
            handleAddToCart(title, price, id, availableQuantity, thumbnail);
            shoppingCartQuantitySum();
          } }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Products.propTypes = {
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  shoppingCartQuantitySum: PropTypes.func.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  available_quantity: PropTypes.number.isRequired,
  shipping: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

};

export default Products;
