import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <div className="form-container">
        <label className="input-container" htmlFor="name-input">
          Nome
          <br />
          <input
            className="input-ele"
            onChange={ onInputChange }
            value={ cardName }
            name="cardName"
            type="text"
            data-testid="name-input"
          />
        </label>
        <br />
        <label className="input-container" htmlFor="textarea">
          Descrição
          <br />
          <textarea
            className="input-ele"
            value={ cardDescription }
            type="text"
            onChange={ onInputChange }
            name="cardDescription"
            data-testid="description-input"
            id=""
            cols="30"
            rows="10"
          />
        </label>
        <br />
        <label className="input-container" htmlFor="atribute1">
          Attr01
          <input
            className="input-ele"
            value={ cardAttr1 }
            onChange={ onInputChange }
            type="number"
            data-testid="attr1-input"
            name="cardAttr1"
          />
        </label>
        <br />
        <label className="input-container" htmlFor="atribute2">
          Attr02
          <input
            className="input-ele"
            value={ cardAttr2 }
            onChange={ onInputChange }
            type="number"
            data-testid="attr2-input"
            name="cardAttr2"
          />
        </label>
        <br />
        <label className="input-container" htmlFor="atribute3">
          Attr03
          <input
            className="input-ele"
            value={ cardAttr3 }
            onChange={ onInputChange }
            type="number"
            data-testid="attr3-input"
            name="cardAttr3"
          />
        </label>
        <br />
        <label className="input-container" htmlFor="image">
          Imagem
          <input
            className="input-ele"
            value={ cardImage }
            onChange={ onInputChange }
            type="text"
            data-testid="image-input"
            name="cardImage"
          />
        </label>
        <br />
        <label className="input-container" htmlFor="select">
          Raridade
          <select
            className="input-ele"
            value={ cardRare }
            onChange={ onInputChange }
            data-testid="rare-input"
            name="cardRare"
            id=""
            type="text"
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>

        </label>
        <br />
        {
          hasTrunfo === false
            ? (
              <label className="input-container" htmlFor="checkbox">
                <input
                  className="input-ele"
                  checked={ cardTrunfo }
                  onChange={ onInputChange }
                  type="checkbox"
                  data-testid="trunfo-input"
                  name="cardTrunfo"
                />
                Super Trybe Trunfo
              </label>
            ) : 'Você já tem um Super Trunfo em seu baralho'
        }
        <br />
        <button
          className="submit-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          data-testid="save-button"
          type="submit"
        >
          Salvar

        </button>

      </div>
    );
  }
}
Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
