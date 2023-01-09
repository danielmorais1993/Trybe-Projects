import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
  renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite={ false } />);
  const pikachuName = screen.getByText(/pikachu/i);
  const pikachuType = screen.getByTestId('pokemon-type');
  const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
  const pikachuImage = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });

  expect(pikachuName).toBeInTheDocument();
  expect(pikachuType).toHaveTextContent('Electric');
  expect(pikachuWeight).toBeInTheDocument();
  expect(pikachuImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});
test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
  const { history } = renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite />);
  const getDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  expect(getDetails).toBeInTheDocument();
  userEvent.click(getDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemon/25');
  const favoriteIcon = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
});
