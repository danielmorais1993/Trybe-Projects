/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Redirect } from 'react-router-dom';
import Review from '../components/Review';
import { getProductById, handleAddToCart } from '../services/api';

class ProductDetails extends Component {
  state = {
    properties: {},
    hasLoaded: false,
    redirect: false,
    isFormValid: true,
    inputEmail: '',
    textarea: '',
    note: '0',
    reviews: [],
    totalCartQuantity: 0,
  };

  async componentDidMount() {
    this.getReviews();
    console.log(this.props);
    const { match } = this.props;
    const { params: { id } } = match;
    const response = await getProductById(id);
    const { title, thumbnail, price, available_quantity: availableQuantity } = response;
    this.setState({
      hasLoaded: true,
      properties: {
        title,
        thumbnail,
        price,
        id,
        availableQuantity,

      },
    });
    this.shoppingCartQuantitySum();
  }

  redirectToCart = () => {
    this.setState({
      redirect: true,
    });
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationButton);
  };

  addReviewToLocalStorage = () => {
    const { inputEmail, textarea, note } = this.state;
    const { match } = this.props;
    const { params: { id } } = match;

    const currentLocalStorage = JSON.parse(localStorage.getItem(id)) || [];
    const newReview = { inputEmail, textarea, note };
    const newLocaStorage = [...currentLocalStorage, newReview];

    localStorage.setItem(id, JSON.stringify(newLocaStorage));
    this.setState({
      inputEmail: '',
      note: '0',
      textarea: '',
    }, this.getReviews());
  };

  isButtonValid = () => {
    const { inputEmail, note } = this.state;
    const isEmailValid = inputEmail.match(/[0-9a-zA-Z.'/]*@[a-z]+\.com/g);
    return (isEmailValid && note !== '0');
  };

  handleSubmit = () => {
    const isButtonValid = this.isButtonValid();
    if (isButtonValid) this.addReviewToLocalStorage();
    this.setState({
      isFormValid: isButtonValid,
    });
  };

  getReviews = () => {
    const { match } = this.props;
    const { params: { id } } = match;
    const reviews = JSON.parse(localStorage.getItem(id)) || [];
    this.setState({ reviews });
  };

  shoppingCartQuantitySum = () => {
    console.log('a');
    const currentCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = currentCartItems.reduce((acc, curr) => (
      acc + (+curr.quantity)), 0);
    this.setState({ totalCartQuantity: totalQuantity });
  };

  render() {
    const { properties: { title, thumbnail, price, id, availableQuantity },
      hasLoaded, redirect, inputEmail, isFormValid, textarea, note,
      reviews, totalCartQuantity } = this.state;

    return (
      <div className="flex flex-col justify-center items-center text-blue-600 text-3xl">
        { hasLoaded && (
          <div
            className="flex flex-col text-blue-600 text-3xl
          justify-center  items-center "
          >
            <p
              data-testid="product-detail-name"
            >
              { title }

            </p>
            <img
              className="w-40 rounded-full "
              data-testid="product-detail-image"
              src={ thumbnail }
              alt={ title }
            />
            <p data-testid="product-detail-price">{ price }</p>
            <button
              className="self-center
            w-96 mt-10 bg-transparent hover:bg-blue-500
            text-blue-700 font-semibold hover:text-white
            border border-blue-500 hover:border-transparent rounded"
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={ () => {
                handleAddToCart(title, price, id, availableQuantity);
                this.shoppingCartQuantitySum();
              } }
            >
              Adicionar ao carrinho
            </button>

          </div>
        )}
        <button
          className="self-center
        w-96 mt-10 bg-transparent hover:bg-blue-500
        text-blue-700 font-semibold hover:text-white
        border border-blue-500 hover:border-transparent rounded"
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.redirectToCart }
        >
          Ir para carrinho!
        </button>
        <p data-testid="shopping-cart-size" className="m-2">{totalCartQuantity}</p>
        { redirect && <Redirect to="/shoppingCart" />}
        <form>
          <input
            className="h-10 self-center
              w-96
              justify-self-end
             form-control
              block
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="email"
            name="inputEmail"
            value={ inputEmail }
            onChange={ this.handleInputChange }
            data-testid="product-detail-email"
            placeholder="Digite seu email"
            required
          />
          <div className="flex m-10 justify-around " onChange={ this.handleInputChange }>
            <label htmlFor="rate-1">
              {
                Number(note) > 0 ? <AiFillHeart
                  style={ { fill: 'red' } }
                  className="icon-heart"
                />
                  : <AiOutlineHeart />
              }

              <input
                id="rate-1"
                className="w-0"
                checked={ note === '1' }
                value="1"
                type="radio"
                name="note"
                data-testid="1-rating"
              />
            </label>
            <label htmlFor="rate-2">
              {
                Number(note) > 1 ? <AiFillHeart style={ { fill: 'red' } } />
                  : <AiOutlineHeart />
              }
              <input
                className="w-0"
                id="rate-2"
                checked={ note === '2' }
                value="2"
                type="radio"
                name="note"
                data-testid="2-rating"
              />
            </label>
            <label htmlFor="rate-3">
              {
                Number(note) > 2 ? <AiFillHeart style={ { fill: 'red' } } />
                  : <AiOutlineHeart />
              }
              <input
                className="w-0"
                id="rate-3"
                checked={ note === '3' }
                value="3"
                type="radio"
                name="note"
                data-testid="3-rating"
              />
            </label>
            <label htmlFor="rate-4">
              {
                Number(note) > 3 ? <AiFillHeart style={ { fill: 'red' } } />
                  : <AiOutlineHeart />
              }
              <input
                className="w-0"
                id="rate-4"
                checked={ note === '4' }
                value="4"
                type="radio"
                name="note"
                data-testid="4-rating"
              />
            </label>
            <label htmlFor="rate-5">
              {
                Number(note) > 4 ? <AiFillHeart style={ { fill: 'red' } } />
                  : <AiOutlineHeart />
              }
              <input
                id="rate-5"
                // eslint-disable-next-line max-lines
                className="w-0"
                checked={ note === '5' }
                value="5"
                type="radio"
                name="note"
                data-testid="5-rating"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <textarea
              className=" self-center
          w-96
          justify-self-end
         form-control
          block
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              name="textarea"
              value={ textarea }
              onChange={ this.handleInputChange }
              data-testid="product-detail-evaluation"
            />
            <button
              className="self-center
           w-96 mt-10 bg-transparent hover:bg-blue-500
           text-blue-700 font-semibold hover:text-white
           border border-blue-500 hover:border-transparent rounded"
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.handleSubmit }
            >
              Enviar
            </button>
          </div>
          { !isFormValid && <p data-testid="error-msg"> Campos inválidos </p>}
        </form>
        { reviews.length && (
          reviews.map((review) => <Review key={ review.textarea } { ...review } />)
        )}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
