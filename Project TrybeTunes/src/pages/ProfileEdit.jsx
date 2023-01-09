import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  isLoading: true,
  user: [],
  inputName: ' ',
  inputEmail: ' ',
  inputDescription: ' ',
  inputImage: ' ',
  isSaveButtonDisable: true,
  redirect: false,
};
const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
export default class ProfileEdit extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true }, async () => {
      const userData = await getUser();
      console.log(userData);
      if (userData) {
        this.setState({ isLoading: false,
          inputName: userData.name,
          inputEmail: userData.email,
          inputDescription: userData.description,
          inputImage: userData.image,
        });
      }
    });
  };

  validateButton = () => {
    const {
      inputName,
      inputEmail,
      inputDescription,
      inputImage,

    } = this.state;
    if (inputName
      && inputEmail.match(regExp)
      && inputDescription
      && inputImage
    ) {
      return this.setState({ isSaveButtonDisable: false });
    }

    return this.setState({ isSaveButtonDisable: true });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => this.validateButton());
  };

  onHandleClick = async () => {
    const {
      inputName,
      inputEmail,
      inputDescription,
      inputImage,

    } = this.state;
    const obj = {
      name: inputName,
      email: inputEmail,
      image: inputImage,
      description: inputDescription,
    };
    this.setState({ isLoading: true }, async () => {
      await updateUser(obj);
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { isLoading,
      inputName,
      inputEmail,
      inputDescription,
      inputImage,
      isSaveButtonDisable,
    } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          isLoading ? <Loading />
            : (
              <div>
                <label htmlFor="name-input">
                  Nome
                  <input
                    id="name-input"
                    name="inputName"
                    type="text"
                    data-testid="edit-input-name"
                    value={ inputName }
                    onChange={ this.onInputChange }
                  />
                </label>
                <br />

                <label htmlFor="email-input">
                  email
                  <input
                    id="email-input"
                    name="inputEmail"
                    type="email"
                    data-testid="edit-input-email"
                    value={ inputEmail }
                    onChange={ this.onInputChange }
                  />
                </label>
                <br />
                <label htmlFor="description-input">
                  Description
                  <br />
                  <textarea
                    id="description-input"
                    name="inputDescription"
                    type="text"
                    data-testid="edit-input-description"
                    value={ inputDescription }
                    onChange={ this.onInputChange }
                    cols="30"
                    rows="10"
                  />
                </label>
                <br />
                <label htmlFor="image-input">
                  Foto
                  <input
                    id="image-input"
                    type="text"
                    data-testid="edit-input-image"
                    onChange={ this.onInputChange }
                    name="inputImage"
                    value={ inputImage }
                  />
                </label>
                <img
                  id="image"
                  src={ inputImage }
                  alt={ inputName }
                />
                <br />
                <button
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ isSaveButtonDisable }
                  onClick={ async () => {
                    await this.onHandleClick();
                    history.push('/profile');
                  } }
                >
                  Salvar
                </button>
              </div>
            )
        }

      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};
