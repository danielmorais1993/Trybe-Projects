/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import tryunfoLogo from '../images/logo_tryunfo.png';

export default class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardTrunfo,
    } = this.props;
    return (
      <div>
        <div className="card-container">
          <div className="card-container">
            <header className="card-text">
              <h1 className="card-name" data-testid="name-card">{cardName}</h1>
            </header>
            <div>
              <img
                className="card-image"
                data-testid="image-card"
                src={ cardImage }
                alt={ cardName }
              />
              {
                cardTrunfo === true
              && <img
                className="index-trunfo"
                data-testid="trunfo-card"
                src={ tryunfoLogo }
                alt="tryunfo"
              />

              }
            </div>
            <p className="description-card" data-testid="description-card">
              { cardDescription }
            </p>
            <div className="card-attribute">
              <ul>
                <li className="card" data-testid="attr1-card">
                  Attr01.................................................
                  <span className="attr">{cardAttr1}</span>
                </li>
                <li className="card" data-testid="attr2-card">
                  Attr02.................................................
                  <span className="attr">{cardAttr2}</span>
                </li>
                <li className="card" data-testid="attr3-card">
                  Attr03.................................................
                  <span className="attr">{cardAttr3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};
