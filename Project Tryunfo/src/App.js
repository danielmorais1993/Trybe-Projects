/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';
import tryunfoLogo from './images/logo_tryunfo.png';

const INITIAL_STATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  cardsSaved: [],
  nameFilter: '',
  rareFilter: '',
  isTrunfoButtoDisable: false,
};
const rarity = ['normal', 'muito raro', 'raro'];

class App extends React.Component {
  state = INITIAL_STATE;

  validateButton = () => {
    const {
      ...state
    } = this.state;
    const nmax = 90;
    const smax = 210;
    const isValid = (state.cardName.length === 0
      || state.cardDescription.length === 0
      || state.cardImage.length === 0
      || state.cardRare.length === 0
      || !(state.cardAttr1 >= 0 && state.cardAttr1 <= nmax)
      || !(state.cardAttr2 >= 0 && state.cardAttr2 <= nmax)
      || !(state.cardAttr3 >= 0 && state.cardAttr3 <= nmax)
      || (Number(state.cardAttr1) + Number(state.cardAttr2)
       + Number(state.cardAttr3) > smax));
    this.setState({
      isSaveButtonDisabled: isValid,
    });
  };

  validateTrunfo = () => {
    const { cardsSaved } = this.state;
    const Trunfo = cardsSaved.some((card) => card.cardTrunfo === true);
    this.setState({
      hasTrunfo: Trunfo,
    });
  };

  onSaveButtonClick = () => {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo,
    } = this.state;
    const cardInfo = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState((current) => {
      const cardsSaved = [...current.cardsSaved, cardInfo];
      return {
        cardsSaved,
      };
    }, () => {
      this.setState({
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: false,
        isSaveButtonDisabled: true,

      });
      this.validateTrunfo();
    });
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

  deleteCard = (name) => {
    const { cardsSaved } = this.state;
    const filteredCard = cardsSaved.filter((card) => name !== card.cardName);
    this.setState({
      cardsSaved: filteredCard,

    }, () => {
      const { cardsSaved: allCards } = this.state;
      this.setState({
        hasTrunfo: allCards.some((card) => card.cardTrunfo),
      });
    });
  };

  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardTrunfo,
      hasTrunfo,
      cardRare,
      isSaveButtonDisabled,
      cardsSaved,
      rareFilter,
      nameFilter,
      trunfoFilter,
    } = this.state;
    return (
      <div className="main">
        <header className="header-logo">
          <img src={ tryunfoLogo } alt="tryunfo" />
        </header>
        <section className="interface-container">
          <section className="form-input">
            <Form
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              cardRare={ cardRare }
            />
            <div>
              <h1 className="preview">Pré-Visualização</h1>

              <Card
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardImage={ cardImage }
                cardTrunfo={ cardTrunfo }
                hasTrunfo={ hasTrunfo }
                cardRare={ cardRare }
              />
            </div>
          </section>
          <div className="f-c-container">
            <section className="filter-container">
              <label htmlFor="nameFilter">
                Filtro por nome:
                <input
                  type="text"
                  data-testid="name-filter"
                  name="nameFilter"
                  onChange={ this.onInputChange }
                  value={ nameFilter }
                  disabled={ trunfoFilter }
                />
              </label>
              <label htmlFor="rareFiler">
                Filtro por raridade:
                <select
                  data-testid="rare-filter"
                  name="rareFilter"
                  id=""
                  type="text"
                  onChange={ this.onInputChange }
                  value={ rareFilter }
                  disabled={ trunfoFilter }
                >
                  <option value="todas">todas</option>
                  <option value="normal">normal</option>
                  <option value="raro">raro</option>
                  <option value="muito raro">muito raro</option>
                </select>
              </label>
              <label htmlFor="trunfoFilter">
                Super Trunfo
                <input
                  type="checkbox"
                  data-testid="trunfo-filter"
                  name="trunfoFilter"
                  onChange={ this.onInputChange }
                  value={ trunfoFilter }
                />
              </label>
            </section>
            <section className="filtered-cards">

              {

                cardsSaved.filter((filterName) => {
                  if (nameFilter) {
                    return filterName.cardName.includes(nameFilter);
                  }
                  return true;
                }).filter((rarityFilter) => {
                  if (rareFilter && rarity.includes(rareFilter)) {
                    return rarityFilter.cardRare === rareFilter;
                  }
                  return true;
                }).filter((trunfo) => {
                  if (trunfoFilter) {
                    return trunfo.cardTrunfo;
                  }
                  return true;
                }).map((card, index) => (
                  <div key={ card.cardName }>
                    <Card
                      cardName={ card.cardName }
                      cardDescription={ card.cardDescription }
                      cardAttr1={ card.cardAttr1 }
                      cardAttr2={ card.cardAttr2 }
                      cardAttr3={ card.cardAttr3 }
                      cardImage={ card.cardImage }
                      cardTrunfo={ card.cardTrunfo }
                      hasTrunfo={ card.hasTrunfo }
                      cardRare={ card.cardRare }

                    />
                    <button
                      type="button"
                      data-testid="delete-button"
                      onClick={ () => this.deleteCard(card.cardName) }
                      key={ index }
                      name={ card.cardName }
                      className="delete-button"
                    >
                      Excluir
                    </button>
                  </div>
                ))

              }
            </section>
          </div>

        </section>

      </div>
    );
  }
}

export default App;
