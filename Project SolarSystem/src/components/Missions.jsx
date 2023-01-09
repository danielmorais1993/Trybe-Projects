import React from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissionCard from './MissionCard';

class Missions extends React.Component {
  render() {
    return (
      <div className="mission-position">
        <div className="mission-container">
          <div data-testid="missions">
            <Title headline="Missões" />
          </div>

          <section className="mission-card">
            {missions.map((mission) => (<MissionCard
              name={ mission.name }
              year={ mission.year }
              key={ mission.name }
              country={ mission.country }
              destination={ mission.destination }
            />))}
          </section>
        </div>
      </div>
    );
  }
}

export default Missions;
