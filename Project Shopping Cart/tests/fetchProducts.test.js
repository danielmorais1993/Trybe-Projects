require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testando se fetchProducts é uma função: ' , () => {
   expect(typeof fetchProducts).toBe('function');
  })
  it('Testando se a funçao fetch foi chamada: ' , async () => {
    await fetchProducts('computador');
    
    expect(fetch).toHaveBeenCalled();
   })
   it('Verifica se fetch é chamada com o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const response = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Verifica se quando a funçao é chamada retorna objeto com a mesma ', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    const reponse = await fetchProducts('computador');
    expect(reponse).toEqual(computadorSearch);
  });
  it("ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: 'You must provide an url'. ", async () => {
    

    expect( await fetchProducts()).toEqual(new Error('You must provide an url'));
  });

  
  // implemente seus testes aqui
  // fail('Teste vazio');
});
