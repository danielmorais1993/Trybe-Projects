import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

const INITIAL_STATE = {
  isLoading: false,
  favorite: false,
};

export default class MusicCard extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs = async () => {
    const { music } = this.props;
    this.setState({ isLoading: true }, async () => {
      const data = await getFavoriteSongs();
      if (data.some((e) => e.trackId === music.trackId)) {
        return this.setState({ isLoading: false, favorite: true });
      }
      return this.setState({ isLoading: false, favorite: false });
    });
  };

  validateButton = async () => {
    const { music, action } = this.props;
    const { favorite } = this.state;
    if (favorite) {
      return this.setState({ isLoading: true }, async () => {
        await addSong(music);
        this.setState({ isLoading: false }, action);
      });
    }
    return this.setState({ isLoading: true }, async () => {
      await removeSong(music);
      this.setState({ isLoading: false }, action);
    });
  };

  onHandleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.validateButton();
    });
  };

  render() {
    const { music } = this.props;
    const { isLoading, favorite } = this.state;
    return (
      <div>
        {

          isLoading ? <Loading />
            : (
              <>
                <h3>{ music.trackName }</h3>
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="favorite-name">
                  Favorita
                  <input
                    type="checkbox"
                    id="favorite-name"
                    checked={ favorite }
                    data-testid={ `checkbox-music-${music.trackId}` }
                    name="favorite"
                    onChange={ this.onHandleChange }
                  />
                </label>
              </>
            )

        }

      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  action: PropTypes.func.isRequired,
};
