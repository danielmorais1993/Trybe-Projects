import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  isSaveSubmitDisabled: true,
  inputName: '',
  isLoading: false,
  artistName: '',
  artistList: [],
};

export default class Search extends Component {
  state = INITIAL_STATE;

  validateButton = () => {
    const { inputName } = this.state;
    const numberMin = 2;
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

  handleClick = async () => {
    const { inputName } = this.state;
    this.setState({ isLoading: true, artistName: inputName }, async () => {
      const data = await searchAlbumsAPI(inputName);
      this.setState({
        inputName: '',
        isLoading: false,
        artistList: data,

      });
    });
  };

  render() {
    const { isSaveSubmitDisabled,
      inputName,
      isLoading,
      artistName,
      artistList } = this.state;
    const resultElement = `Resultado de álbuns de: ${artistName}`;
    return (
      <div data-testid="page-search">
        <Header />
        <br />
        {
          isLoading
            ? <Loading />

            : (
              <section>
                <input
                  type="text"
                  placeholder="Nome do Artista"
                  onChange={ this.onInputChange }
                  value={ inputName }
                  name="inputName"
                  data-testid="search-artist-input"
                />
                <button
                  type="button"
                  disabled={ isSaveSubmitDisabled }
                  data-testid="search-artist-button"
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </section>
            )
        }
        {
          artistName
          && (
            <h2>
              {resultElement}
            </h2>
          )
        }
        {
          artistList.length !== 0 || artistName.length === 0
            ? artistList.map((albumCard) => (
              <div key={ albumCard.collectionId }>
                <img src={ albumCard.artworkUrl100 } alt={ albumCard.collectionName } />
                <h2>{albumCard.collectionName}</h2>
                <h3>{albumCard.artistName}</h3>
                <Link
                  data-testid={ `link-to-album-${albumCard.collectionId}` }
                  to={ `/album/${albumCard.collectionId}` }
                >
                  Details
                </Link>

              </div>
            ))
            : <h2>Nenhum álbum foi encontrado</h2>
        }
      </div>
    );
  }
}
