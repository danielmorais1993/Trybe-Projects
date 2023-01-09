import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  renderWithRouter(<App />);
  const home = screen.getByRole('link', { name: 'Home' });
  const about = screen.getByRole('link', { name: 'About' });
  const favorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});
test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação;', async () => {
  const { history } = renderWithRouter(<App />);
  const homeButton = screen.getByRole('link', { name: 'Home' });
  userEvent.click(homeButton);
  await waitFor(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;', async () => {
  const { history } = renderWithRouter(<App />);
  const homeButton = screen.getByRole('link', { name: 'About' });
  userEvent.click(homeButton);
  await waitFor(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
});
test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;', async () => {
  const { history } = renderWithRouter(<App />);
  const homeButton = screen.getByRole('link', { name: 'Favorite Pokémon' });
  userEvent.click(homeButton);
  await waitFor(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/page-does-not-exist');
  });
  await waitFor(() => {
    const notFound = screen.queryByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
