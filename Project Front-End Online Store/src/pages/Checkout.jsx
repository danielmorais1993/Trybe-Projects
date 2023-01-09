/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '@djthoms/pretty-checkbox';
import Ticket from '../Images/Ticket.png';

class Checkout extends Component {
  state = {
    name: '',
    cpf: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    isFormValid: true,
    cartItems: [],
    goToHome: false,
  };

  componentDidMount() {
    this.fetchCartitems();
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isFormValid = () => {
    const { name, cpf, email, phone, cep, address, payment } = this.state;
    const arr = [name, cpf, phone, cep, address, payment];
    const isFieldsValid = arr.every((campo) => campo.length > 0);
    const isEmailValid = email.match(/[0-9a-zA-Z.'/]*@[a-z]+\.com/g);
    const isValid = isFieldsValid && isEmailValid;
    this.setState({
      isFormValid: isValid,
    });
    return isValid;
  };

  handleSubmit = () => {
    const isValid = this.isFormValid();
    if (isValid) {
      localStorage.setItem('cartItems', JSON.stringify([]));
      this.fetchCartitems();
      this.setState({
        goToHome: true,
      });
    }
  };

  fetchCartitems = () => {
    const currentLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({ cartItems: currentLocalStorage });
  };

  render() {
    const { name, cpf, email, phone, cep,
      address, payment, isFormValid, cartItems, goToHome } = this.state;
    return (
      <div className="flex   justify-around">
        <div className="flex flex-col w-96">
          { cartItems.length === 0 ? (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>
          ) : (
            cartItems.map((cartItem) => (
              <div
                key={ cartItem.id }
                className="flex justify-center h-48
              content-center border-2 border-indigo-600 m-3 rounded-tl-lg"
              >
                <img className="w-64 rounded-full" src={ cartItem.thumbnail } alt="" />
                <p className="self-center text-blue-600">
                  { cartItem.title }
                </p>
              </div>
            ))

          )}
        </div>

        <form className="flex flex-col w-96 justify-center align-center">
          <input
            className="
          mt-3
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out"
            type="text"
            name="name"
            data-testid="checkout-fullname"
            placeholder="Nome Completo"
            value={ name }
            onChange={ this.handleInputChange }
          />
          <input
            className="
            mt-3
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out"
            type="text"
            name="cpf"
            data-testid="checkout-cpf"
            placeholder="CPF"
            value={ cpf }
            onChange={ this.handleInputChange }
          />
          <input
            className="mt-3 bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out"
            type="email"
            name="email"
            data-testid="checkout-email"
            placeholder="Email"
            value={ email }
            onChange={ this.handleInputChange }
          />
          <input
            className="
            mt-3
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out"
            type="text"
            name="phone"
            data-testid="checkout-phone"
            placeholder="Telefone"
            value={ phone }
            onChange={ this.handleInputChange }
          />
          <input
            className=" mt-3
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out"
            type="text"
            name="cep"
            data-testid="checkout-cep"
            placeholder="CEP"
            value={ cep }
            onChange={ this.handleInputChange }
          />
          <input
            className=" mt-3
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out"
            type="text"
            name="address"
            data-testid="checkout-address"
            placeholder="Endereço"
            value={ address }
            onChange={ this.handleInputChange }
          />
          <div className="flex justify-between mt-2" onChange={ this.handleInputChange }>

            <label htmlFor="ticket" className="flex flex-col">
              <div className="flex ">
                <input
                  animation="pulse"
                  color="info-o"
                  checked={ payment === 'ticket' }
                  value="ticket"
                  type="radio"
                  name="payment"
                  id="ticket"
                  data-testid="ticket-payment"
                />
                <img className="" src={ Ticket } alt="ticket" />
              </div>
            </label>
            <label htmlFor="visa" className="flex flex-col">
              <div className="flex ">
                <input
                  animation="pulse"
                  color="info-o"
                  checked={ payment === 'visa' }
                  value="visa"
                  type="radio"
                  name="payment"
                  id="visa"
                  data-testid="visa-payment"
                />
                <svg className="ml-1 w-9" fill="#000000" viewBox="0 -6 36 36" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g id="SVGRepo_iconCarrier"><path d="m33.6 24h-31.2c-1.325 0-2.4-1.075-2.4-2.4v-19.2c0-1.325 1.075-2.4 2.4-2.4h31.2c1.325 0 2.4 1.075 2.4 2.4v19.2c0 1.325-1.075 2.4-2.4 2.4zm-15.76-9.238-.359 2.25c.79.338 1.709.535 2.674.535.077 0 .153-.001.229-.004h-.011c.088.005.19.008.294.008 1.109 0 2.137-.348 2.981-.941l-.017.011c.766-.568 1.258-1.469 1.258-2.485 0-.005 0-.01 0-.015v.001c0-1.1-.736-2.014-2.187-2.72-.426-.208-.79-.426-1.132-.672l.023.016c-.198-.13-.33-.345-.343-.592v-.002c.016-.26.165-.482.379-.6l.004-.002c.282-.164.62-.261.982-.261.042 0 .084.001.126.004h-.006.08c.023 0 .05-.001.077-.001.644 0 1.255.139 1.806.388l-.028-.011.234.125.359-2.171c-.675-.267-1.458-.422-2.277-.422-.016 0-.033 0-.049 0h.003c-.064-.003-.139-.005-.214-.005-1.096 0-2.112.347-2.943.937l.016-.011c-.752.536-1.237 1.404-1.237 2.386v.005c-.01 1.058.752 1.972 2.266 2.72.4.175.745.389 1.054.646l-.007-.006c.175.148.288.365.297.608v.002.002c0 .319-.19.593-.464.716l-.005.002c-.3.158-.656.25-1.034.25-.015 0-.031 0-.046 0h.002c-.022 0-.049 0-.075 0-.857 0-1.669-.19-2.397-.53l.035.015-.343-.172zm10.125 1.141h3.315q.08.343.313 1.5h2.407l-2.094-10.031h-2c-.035-.003-.076-.005-.118-.005-.562 0-1.043.348-1.239.84l-.003.009-3.84 9.187h2.72l.546-1.499zm-13.074-8.531-1.626 10.031h2.594l1.625-10.031zm-9.969 2.047 2.11 7.968h2.734l4.075-10.015h-2.746l-2.534 6.844-.266-1.391-.904-4.609c-.091-.489-.514-.855-1.023-.855-.052 0-.104.004-.154.011l.006-.001h-4.187l-.031.203c3.224.819 5.342 2.586 6.296 5.25-.309-.792-.76-1.467-1.326-2.024l-.001-.001c-.567-.582-1.248-1.049-2.007-1.368l-.04-.015zm25.937 4.421h-2.16q.219-.578 1.032-2.8l.046-.141c.042-.104.094-.24.16-.406s.11-.302.14-.406l.188.859.593 2.89z" /></g>
                </svg>
              </div>
            </label>
            <label htmlFor="master" className="flex flex-col">
              <div className="flex ">
                <input
                  animation="pulse"
                  color="info-o"
                  checked={ payment === 'master' }
                  value="master"
                  type="radio"
                  name="payment"
                  id="master"
                  data-testid="master-payment"
                />
                <svg className=" ml-1 w-9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <g fill="none" fillRule="evenodd">
                      {' '}
                      <circle cx="7" cy="12" r="7" fill="#EA001B" />
                      {' '}
                      <circle cx="17" cy="12" r="7" fill="#FFA200" fillOpacity=".8" />
                      {' '}
                    </g>
                    {' '}
                  </g>
                </svg>

              </div>
            </label>

            <label htmlFor="visa" className="flex flex-col">
              <div className="flex ">
                <input
                  animation="pulse"
                  color="info-o"
                  checked={ payment === 'visa' }
                  value="visa"
                  type="radio"
                  name="payment"
                  id="visa"
                  data-testid="visa-payment"
                />
                <svg viewBox="0 -140 780 780" className="w-9" enableBackground="new 0 0 780 500" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M0,42.505C0,19.021,18.604,0,41.573,0h696.354c22.97,0,41.573,19.021,41.573,42.505v415.49 c0,23.482-18.604,42.505-41.573,42.505H41.573C18.604,500.5,0,481.479,0,457.995V42.505z" fill="#393939" />
                    <path
                      d="m170.45 186.15c6.7-2.199 13.9-3.5 21.4-3.5 32.6 0 59.8 23.2 66 53.9l46.2-9.4c-10.6-52.3-56.8-91.6-112.2-91.6-12.7 0-24.9
                    2.1-36.3 5.9l14.9 44.7zm-54.5 149.7l31.2-35.3c-14.459-12.799-22.727-31.189-22.7-50.5 0-20.1 8.8-38.1 22.7-50.4l-31.2-35.3c-23.7 21-38.6 51.601-38.6 85.7s14.9 64.8 38.6 85.8zm141.8-72.3c-6.3 30.7-33.4 53.8-66 53.8-7.5 0-14.7-1.2-21.4-3.5l-15 44.7c11.4 3.8 23.6 5.9 36.3 5.9 55.4 0 101.5-39.301 112.2-91.5l-46.1-9.4zm200 31.599c-7.6 7.4-18 11.9-29.398 11.801-7.802-0.101-15.102-2.5-21.2-6.399l-15.3 24.399c10.5 6.601 22.8 10.5 36.1 10.699 19.4
                    // eslint-disable-next-line max-len
                    0.301 37-7.3 49.9-19.898l-20.102-20.602zm-27.7-99.199c-38.5-0.601-70.3 30.199-70.898 68.8-0.2 14.5 4 28 11.3 39.2l126.5-54.1c-7.099-30.5-34.2-53.4-66.9-53.9m-41.9 74.199c-0.2-1.6-0.3-3.3-0.2-5 0.4-22.699 19.1-40.898 41.8-40.5 12.4 0.2 23.3 5.801 30.8 14.601l-72.4 30.899zm148.5-105.7v134.9l23.398 9.7-11.099 26.6-23.1-9.6c-5.2-2.3-8.7-5.7-11.4-9.6-2.6-4-4.5-9.4-4.5-16.7v-135.3h26.701zm84.4 62.3c4.102-1.4 8.5-2.101 13-2.101
                    19.9 0 36.5 14.101 40.302 32.9l28.198-5.7c-6.5-31.899-34.698-55.899-68.5-55.899-7.698 0-15.198 1.3-22.1 3.6l9.1
                    27.2zm-33.199 91.399l19.1-21.5c-8.5-7.5-13.9-18.5-13.9-30.8s5.4-23.2 13.9-30.8l-19.1-21.5c-14.5 12.8-23.602 31.5-23.602 52.3s9.102 39.501 23.602 52.3zm86.5-44.099c-3.802 18.7-20.4 32.9-40.302 32.9-4.6 0-8.898-0.7-13-2.102l-9.1 27.301c7 2.301 14.4 3.601 22.2 3.601 33.8 0 62-24 68.5-55.9l-28.298-5.8z"
                      fill="#ffffff"
                    />
                  </g>
                </svg>
              </div>
            </label>
            {' '}

          </div>
          <button
            type="button"
            data-testid="checkout-btn"
            className="mt-3 ml-3
            bg-transparent hover:bg-blue-500
            text-blue-700 font-semibold hover:text-white
            border border-blue-500 hover:border-transparent rounded"
            onClick={ this.handleSubmit }
          >
            Comprar

          </button>
        </form>
        { !isFormValid && <p className="text-red-600" data-testid="error-msg">Campos inválidos</p>}
        { goToHome && <Redirect to="/" /> }
      </div>
    );
  }
}

export default Checkout;
