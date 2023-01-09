import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
  renderWithRouter(<App />);
  const encountered = screen.getByRole('heading', {
    name: /encountered pokémon/i,
  });
  expect(encountered).toBeInTheDocument();
});
test('Achar pokemon uma a um ate o ultimo que retorna para o antigo', async () => {
  renderWithRouter(<App />);
  const nextButton = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  expect(nextButton).toHaveTextContent(/próximo pokémon/i);
  pokemonList.forEach((pokemon, index) => {
    userEvent.click(nextButton);
    const previousPokemon = screen.queryByRole('img', {
      name: `${pokemon.name} sprite`,
    });
    if (index === 8) {
      const actualPokemon = screen.getByRole('img', {
        name: `${pokemonList[0].name} sprite`,
      });
      expect(actualPokemon).toBeInTheDocument();
      expect(previousPokemon).not.toBeInTheDocument();
    } else {
      const actualPokemon = screen.getByRole('img', {
        name: `${pokemonList[index + 1].name} sprite`,
      });
      expect(actualPokemon).toBeInTheDocument();
      expect(previousPokemon).not.toBeInTheDocument();
    }
  });
});
test('Teste se a Pokédex tem os botões de filtro:', () => {
  renderWithRouter(<App />);
  pokemonList.forEach((pokemon) => {
    const buttonType = screen.getByRole('button', {
      name: pokemon.type,
    });
    expect(buttonType).toBeInTheDocument();
  });
  const buttonAll = screen.getByRole('button', {
    name: 'All',
  });
  expect(buttonAll).toBeInTheDocument();
  const filterButtons = screen.getAllByTestId('pokemon-type-button');
  expect(filterButtons).toHaveLength(7);
});
test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo;', () => {
  renderWithRouter(<App />);
  pokemonList.forEach((pokemon) => {
    const buttonType = screen.getByRole('button', {
      name: pokemon.type,
    });

    userEvent.click(buttonType);
    const pokemonsfilter = pokemonList.filter((poke) => poke.type === pokemon.type);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    pokemonsfilter.forEach((filteredPoke) => {
      const typePoke = screen.getByTestId('pokemon-type');
      expect(typePoke).toHaveTextContent(filteredPoke.type);
      userEvent.click(nextButton);
    });
  });
});
test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
  renderWithRouter(<App />);
  const buttonAll = screen.getByRole('button', {
    name: 'All',
  });
  expect(buttonAll).toBeInTheDocument();
  const buttonType = screen.getByRole('button', {
    name: 'Electric',
  });
  const foward = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  userEvent.click(buttonType);
  expect(foward).toBeDisabled();
  userEvent.click(buttonAll);
  expect(foward).not.toBeDisabled();
  pokemonList.forEach((pokemon, index) => {
    userEvent.click(foward);
    const previousPokemon = screen.queryByRole('img', {
      name: `${pokemon.name} sprite`,
    });
    if (index === 8) {
      const actualPokemon = screen.getByRole('img', {
        name: `${pokemonList[0].name} sprite`,
      });
      expect(actualPokemon).toBeInTheDocument();
      expect(previousPokemon).not.toBeInTheDocument();
    } else {
      const actualPokemon = screen.getByRole('img', {
        name: `${pokemonList[index + 1].name} sprite`,
      });
      expect(actualPokemon).toBeInTheDocument();
      expect(previousPokemon).not.toBeInTheDocument();
    }
  });
});
