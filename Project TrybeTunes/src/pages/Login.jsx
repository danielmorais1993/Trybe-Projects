import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  isSaveSubmitDisabled: true,
  inputName: '',
  isLoading: false,
  redirect: false,
};
export default class Login extends Component {
  state = INITIAL_STATE;

  handleSubmit = async (event) => {
    event.preventDefault();
    const { inputName } = this.state;
    const obj = {
      name: inputName,
    };
    this.setState({ isLoading: true });
    await createUser(obj);
    this.setState({ redirect: true });
  };

  validateButton = () => {
    const { inputName } = this.state;
    const numberMin = 3;
    if (inputName.length >= numberMin) {
      return this.setState({ isSaveSubmitDisabled: false });
    }
    return this.setState({ isSaveSubmitDisabled: true });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.validateButton();
    });
  };

  render() {
    const { isSaveSubmitDisabled, inputName, isLoading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <form action="">
          <label htmlFor="inputName" className="text-3xl font-bold underline">
            Nome:
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
              name="inputName"
              value={ inputName }
            />
          </label>
          <br />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isSaveSubmitDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar

          </button>
          {
            isLoading && <Loading />
          }

        </form>
      </div>
    );
  }
}
