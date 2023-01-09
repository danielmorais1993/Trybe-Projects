import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

const INITIAL_STATE = {
  musicData: [],
  onlyDataMusic: {},
};

export default class Album extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.getMusicsById(id);
  }

  getMusicsById = async (id) => {
    const data = await getMusics(id);
    const musics = data.filter((music) => music.previewUrl);
    this.setState({ musicData: musics, onlyDataMusic: data[0] });
  };

  render() {
    const { musicData, onlyDataMusic } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <section>
          {

            musicData.length > 0 ? (
              <div>
                <h1 data-testid="artist-name">
                  {onlyDataMusic.artistName}

                </h1>
                <h2 data-testid="album-name">
                  {onlyDataMusic.collectionName}
                </h2>
                {
                  musicData.map((music) => (<MusicCard
                    key={ music.trackId }
                    music={ music }
                  />
                  ))
                }
              </div>
            )
              : ''
          }
        </section>

      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
