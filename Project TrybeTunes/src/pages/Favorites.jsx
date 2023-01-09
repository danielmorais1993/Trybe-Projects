import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

const INITIAL_STATE = {
  isLoading: true,
  musicData: [],

};
export default class Favorites extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    this.setState({ isLoading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ isLoading: false, musicData: favoriteSongs });
    });
  };

  render() {
    const { isLoading, musicData } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading ? <Loading />

            : musicData.map((music) => (
              <MusicCard
                key={ music.trackId }
                music={ music }
                action={ this.fetchFavoriteSongs }
              />
            ))

        }

      </div>
    );
  }
}
