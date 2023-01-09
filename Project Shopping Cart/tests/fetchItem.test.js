require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testando se fetchItem é uma função: ' , () => {
    expect(typeof fetchItem).toBe('function');
   })
   it('Testando se a funçao fetch foi chamada: ' , async () => {
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
   })
   it('Verifica se fetch é chamada com o endpoint correto' , async () => {
    const url =  "https://api.mercadolibre.com/items/MLB1615760527";
    const response = await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith(url);
   })
   it('Verifica se quando a funçao é chamada retorna objeto com a mesma ' , async () => {
    const url =  "https://api.mercadolibre.com/items/MLB1615760527";
    const response = await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledWith(url);
   })
   it('Verifica se quando a funçao é chamada retorna objeto com a mesma ' , async () => {
    const url =  "https://api.mercadolibre.com/items/MLB1615760527";
    const response = await fetchItem("MLB1615760527");
    expect(response).toEqual(item);
   })
   it("ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: 'You must provide an url'. ", async () => {
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url')); });
  // implemente seus testes aqui
  // fail('Teste vazio');
});
