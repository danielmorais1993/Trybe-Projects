import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

const INITIAL_STATE = {
  isLoading: true,
  user: [],
};
export default class Profile extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({ isLoading: true }, async () => {
      const userData = await getUser();
      this.setState({ isLoading: false, user: userData });
    });
  };

  render() {
    const { isLoading, user } = this.state;
    const { name, image, description, email } = user;
    return (
      <div data-testid="page-profile">
        <Header />

        {

          isLoading ? <Loading />
            : (
              <div>
                <h2>{name}</h2>
                <img data-testid="profile-image" src={ image } alt={ name } />
                <p>{description}</p>
                <p>{email}</p>
              </div>
            )

        }
        {' '}
        <Link to="/profile/edit">
          Editar perfil
        </Link>

      </div>
    );
  }
}
