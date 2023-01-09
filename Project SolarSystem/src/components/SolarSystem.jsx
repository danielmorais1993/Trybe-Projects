import React, { Component } from 'react';
import Title from './Title';
import planets from '../data/planets';
import PlanetCard from './PlanetCard';

class SolarSystem extends Component {
  render() {
    return (
      <div>
        <div data-testid="solar-system"> </div>
        <Title headline="Planetas" />
        <div className="planet-link" />
        <section className="planet-card">
          {planets.map((planet) => (<PlanetCard
            planetName={ planet.name }
            key={ planet.name }
            planetImage={ planet.image }
          />
          ))}
        </section>
      </div>
    );
  }
}

export default SolarSystem;
