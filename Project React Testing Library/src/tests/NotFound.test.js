import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém um heading h2 com o texto Page requested not found;', () => {
  renderWithRouter(<NotFound />);
  const notFound = screen.getByRole('heading', {
    name: /page requested not found/i,
    level: 2,
  });

  expect(notFound).toBeInTheDocument();
});

test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
  renderWithRouter(<NotFound />);
  const notFound = screen.getByRole('heading', {
    name: /page requested not found/i,
    level: 2,
  });
  const pikaImage = screen.getByRole('img', { name: 'Pikachu crying because the page requested was not found' });

  expect(notFound).toBeInTheDocument();
  expect(pikaImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
