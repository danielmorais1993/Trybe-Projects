const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Testando a função saveCartItens se o método local.SetItem é chamado',() =>{
  const cartItem = 'hello';
  saveCartItems(cartItem);
  expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Testando a função saveCartItens se o método local.SetItem é chamado com os parâmetros cartItems ',() =>{
    const cartItem = 'hello';
    saveCartItems(cartItem);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems',JSON.stringify(cartItem));
    })
});
