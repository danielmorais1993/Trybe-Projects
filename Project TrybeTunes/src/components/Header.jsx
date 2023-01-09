import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../App.css';

const INITIAL_STATE = {
  isLoading: true,
  name: '',

};

export default class Header extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.getUserForHeader();
  }

  getUserForHeader = async () => {
    const user = await getUser();
    this.setState({ isLoading: false, name: user.name });
  };

  render() {
    const { isLoading, name } = this.state;

    return (
      <header data-testid="header-component">
        <div className="header-container">
          <button
            className="header-button"
            type="button"
          >
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </button>
          {' '}
          <button
            className="header-button"
            type="button"
          >
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </button>
          {' '}
          <button
            className="header-button"
            type="button"
          >
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </button>
        </div>
        {
          isLoading ? <Loading /> : <h1 data-testid="header-user-name">{name}</h1>
        }

      </header>

    );
  }
}
