import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

const pokemonList = [{
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
},
];

test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
  renderWithRouter(<FavoritePokemon />);
  const favorite = screen.getByText(/no favorite pokémon found/i);
  expect(favorite).toBeInTheDocument();
});
test('Teste se são exibidos todos os cards de Pokémon favoritados.', () => {
  renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
  const favoriteName = screen.getByText(/pikachu/i);
  const favoriteType = screen.getByText(/electric/i);
  const favoriteWeight = screen.getByText(/average weight: 6\.0 kg/i);
  expect(favoriteName).toBeInTheDocument();
  expect(favoriteType).toBeInTheDocument();
  expect(favoriteWeight).toBeInTheDocument();
});
