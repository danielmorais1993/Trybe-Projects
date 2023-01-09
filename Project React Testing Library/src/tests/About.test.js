import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex;', () => {
  renderWithRouter(<About />);
  const aboutTitle = screen.getByRole('heading', {
    name: /about pokédex/i,
    level: 2,
  });
  const imagePokedex = screen.getByRole('img', {
    name: /pokédex/i,
  });
  const paragraph1 = screen.getByText(
    /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
  );
  const paragraph2 = screen.getByText(
    /one can filter pokémon by type, and see more details for each one of them/i,
  );
  expect(aboutTitle).toBeInTheDocument();
  expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});
