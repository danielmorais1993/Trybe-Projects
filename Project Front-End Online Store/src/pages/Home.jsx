/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Checkbox } from 'pretty-checkbox-react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import Products from '../components/Products';

import { getProductsFromCategoryAndQuery,
  getCategories, getProductsFromCategory } from '../services/api';
import '../tailwind.css';
import '../App.css';
import TrybeLogo from '../Images/FrontEndLogo.png';
import '@djthoms/pretty-checkbox';

class Home extends Component {
  state = {
    redirectToShoppingCart: false,
    categories: [],
    queryInput: '',
    currentCategory: '',
    resultQueryProducts: [],
    totalCartQuantity: 0,
    selectSort: 'none',
    openState: '',
  };

  async componentDidMount() {
    const requestApi = await this.requestApi();
    this.setState({
      categories: requestApi,
    });
    this.shoppingCartQuantitySum();
  }

  requestApi = async () => {
    const api = await getCategories();
    return api;
  };

  onCategoryButtonClick = async (id) => {
    this.setCategory(id);
    const clickedCategory = await getProductsFromCategory(id);
    console.log(clickedCategory.results);
    const { results } = clickedCategory;
    this.setState({ resultQueryProducts: results });
  };

  setCategory = (id) => {
    this.setState({
      currentCategory: id,
    });
  };

  handleCategory = (param) => {
    const categories = param.map(({ name, id }) => (
      <label
        key={ id }
        htmlFor={ id }
        data-testid="category"
        className="mt-3 text-white bg-blue-200
        hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium
        rounded-full text-sm px-5 py-2.5 text-center
        mr-2 mb-2  dark hover:bg-blue-700 pointer
        dark:focus:ring-blue-800  "
      >
        <Checkbox
          animation="pulse"
          color="info-o"
          onClick={ () => this.onCategoryButtonClick(id) }
          name="categories"
          id={ id }
          type="radio"
        />
        { name }
      </label>
    ));
    return categories;
  };

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleQueryButton = async () => {
    const { currentCategory, queryInput } = this.state;
    const queryProducts = await
    getProductsFromCategoryAndQuery(
      currentCategory,
      queryInput,
    );
    const resultQueryProducts = queryProducts.results;
    this.setState({ resultQueryProducts });
  };

  handleSort = async (event) => {
    const { value } = event.target;
    this.handleOnChange(event);
    const { resultQueryProducts } = this.state;

    const sortFunctions = {
      crescent: (a, b) => a.price - b.price,
      decrescent: (a, b) => b.price - a.price,
    };
    const sortFunctionToUse = sortFunctions[value];
    const sortedQuery = resultQueryProducts.sort(sortFunctionToUse);
    this.setState({ resultQueryProducts: sortedQuery });
  };

  shoppingCartQuantitySum = () => {
    const currentCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const totalQuantity = currentCartItems.reduce((acc, curr) => (
      acc + (+curr.quantity)), 0);
    this.setState({ totalCartQuantity: totalQuantity });
  };

  openIconClick = () => {
    this.setState({
      openState: 'open',
    });
  };

  closeInputIcon = () => {
    this.setState({
      openState: '',
      queryInput: '',
    });
  };

  deleteButtonIcon = () => {
    const { queryInput } = this.state;
    this.setState({
      queryInput: queryInput.substring(0, queryInput.length - 1),
    });
  };

  render() {
    const { redirectToShoppingCart, categories, queryInput,
      resultQueryProducts, totalCartQuantity, selectSort, openState } = this.state;
    return (
      <div className="bg-blue-100">
        <header
          className="flex flex-row justify-between align-center
         h-48 bg-gradient-to-r from-cyan-500
         to-blue-500"
        >
          <div
            name="in-sc "
            className={ `search flex flex-row justify-center
          items-center ml-2 ${openState}` }
          >

            <svg className="icon" onClick={ this.openIconClick } viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_iconCarrier"><path fillRule="evenodd" d="M7.25 2a5.25 5.25 0 103.144 9.455l2.326 2.325a.75.75 0 101.06-1.06l-2.325-2.326A5.25 5.25 0 007.25 2zM3.5 7.25a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" clipRule="evenodd" /></g>
            </svg>

            <input
              className="search-input"

              // h-16
              // form-control
              // w-96
              // block
              // text-base
              // font-normal
              // text-gray-700
              // bg-white bg-clip-padding
              // border border-solid border-gray-300
              // rounded
              // transition
              // ease-in-out
              // focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
              autoFocus
              data-testid="query-input"
              value={ queryInput }
              name="queryInput"
              onKeyUp={ this.handleQueryButton }
              onChange={ this.handleOnChange }
            />
            <svg
              className="close text-slate-400"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              onClick={ this.closeInputIcon }
            >

              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_iconCarrier"><path d="M12.78 4.28a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72z" /></g>
            </svg>
            <svg
              className="delete text-slate-400"
              onClick={ this.deleteButtonIcon }
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_iconCarrier"><path d="M 46.0351 49.5742 C 50.9339 49.5742 53.3944 47.1602 53.3944 42.3086 L 53.3944 13.6914 C 53.3944 8.8398 50.9339 6.4258 46.0351 6.4258 L 25.6681 6.4258 C 22.9259 6.4258 20.5587 7.1289 18.6368 9.1680 L 4.8321 23.5118 C 3.3087 25.0820 2.6056 26.4883 2.6056 27.9649 C 2.6056 29.4180 3.2853 30.8477 4.8321 32.4180 L 18.6603 46.6914 C 20.6056 48.7070 22.9494 49.5508 25.6915 49.5508 Z M 40.5743 38.3711 C 40.0118 38.3711 39.5196 38.1602 39.1212 37.7852 L 32.2774 30.8945 L 25.4103 37.7852 C 25.0118 38.1602 24.5196 38.3711 23.9572 38.3711 C 22.8087 38.3711 21.8478 37.4336 21.8478 36.2852 C 21.8478 35.7461 22.0821 35.2305 22.4806 34.8086 L 29.3009 27.9649 L 22.4806 21.1445 C 22.0821 20.7227 21.8478 20.2071 21.8478 19.6680 C 21.8478 18.4961 22.8087 17.5352 23.9572 17.5352 C 24.4962 17.5352 25.0118 17.7461 25.4337 18.1680 L 32.2774 25.0118 L 39.0978 18.1680 C 39.5196 17.7461 40.0353 17.5352 40.5743 17.5352 C 41.7462 17.5352 42.6837 18.4961 42.6837 19.6680 C 42.6837 20.2071 42.4728 20.7227 42.0509 21.1445 L 35.2306 27.9649 L 42.0509 34.8086 C 42.4728 35.2305 42.6837 35.7461 42.6837 36.2852 C 42.6837 37.4336 41.7228 38.3711 40.5743 38.3711 Z" /></g>
            </svg>

            <button
              type="button"
              data-testid="query-button"
              onClick={ this.handleQueryButton }
              className="ml-1"
            >
              <FaSearch />

            </button>

          </div>
          <img src={ TrybeLogo } alt="monkeyLogo" className="front-logo self-center " />
          <select
            className="h-16 self-center
        justify-self-end
        h-16 form-control
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
            name="sortByPrice"
            onChange={ this.handleSort }
          >
            <option
              selected={ selectSort === 'none' }
              value="none"
            >
              Nenhum
            </option>
            <option
              selected={ selectSort === 'crescent' }
              value="crescent"
            >
              Ordernar Menor Preço
            </option>
            <option
              selected={ selectSort === 'decrescent' }
              value="decrescent"
            >
              Ordernar Maior Preço
            </option>
          </select>
          <div className="flex flex-row">
            <button
              type="button"
              data-testid="shopping-cart-button"
              onClick={ () => this.setState({ redirectToShoppingCart: true }) }
            >
              <FaShoppingCart />
            </button>
            <p
              className="sp-cart"
              data-testid="shopping-cart-size"
            >
              {totalCartQuantity}

            </p>
            { redirectToShoppingCart && <Redirect to="/shoppingCart" />}
          </div>
        </header>
        <div className="flex flex-row justify-between">
          {categories.length === 0 ? (
            <h1
              data-testid="home-initial-message"
              className="h-2.5"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>
          ) : (

            <div
              className="flex flex-col items-start
             w-96"
            >
              {this.handleCategory(categories)}

            </div>

          )}
          <div className="flex flex-row flex-wrap justify-center items-center w-full ">
            {
              !resultQueryProducts.length ? (

                <p
                  className="p-3 bg-red-600 rounded-b-lg break-words
                text-white"
                >
                  Nenhum produto foi encontrado

                </p>

              ) : (
                resultQueryProducts
                  .map((result) => (
                    <Products
                      key={ result.id }
                      { ...result }
                      shoppingCartQuantitySum={ this.shoppingCartQuantitySum }
                    />))
              )
            }
          </div>
        </div>
      </div>

    );
  }
}
export default Home;
