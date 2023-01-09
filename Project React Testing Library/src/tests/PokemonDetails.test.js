import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
  renderWithRouter(<App />);
  const getDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(getDetails);
  const pikachuDetails = screen.getByRole('heading', {
    name: /pikachu details/i,
  });
  expect(pikachuDetails).toBeInTheDocument();
  expect(getDetails).not.toBeInTheDocument();
  const summary = screen.getByRole('heading', {
    name: /summary/i,
  });
  expect(summary).toBeInTheDocument();
  const paragraph = screen.getByText(
    /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
  );
  expect(paragraph).toBeInTheDocument();
});

test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
  renderWithRouter(<App />);
  const getDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(getDetails);
  const locations = screen.getByRole('heading', {
    name: /game locations of pikachu/i,
  });
  expect(locations).toBeInTheDocument();
  const location1 = screen.getByText(/kanto viridian forest/i);
  const location2 = screen.getByText(/kanto power plant/i);
  expect(location1).toBeInTheDocument();
  expect(location2).toBeInTheDocument();
  const img = screen.getAllByRole('img', { name: /pikachu location/i });
  expect(img).toHaveLength(2);
  expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});
test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
  renderWithRouter(<App />);
  const getDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(getDetails);
  const favoritePokemon = screen.getByText(/pokémon favoritado\?/i);
  expect(favoritePokemon).toBeInTheDocument();
  const checkBox = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  const label = screen.getByLabelText(/pokémon favoritado/i);
  for (let i = 0; i < 5; i += 1) {
    expect(label).toBeInTheDocument();
    userEvent.click(checkBox);
    if (i % 2 === 0) {
      expect(checkBox).toBeChecked();
    } else {
      expect(checkBox).not.toBeChecked();
    }
  }
});
