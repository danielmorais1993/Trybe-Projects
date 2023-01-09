const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se `productDetails` é uma função', () => {
    expect(typeof productDetails ).toBe('function');
    
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste se productDetails é uma função.
    // Teste se o retorno da função é um array.
    // Teste se o array retornado pela função contém dois itens dentro.
    // Teste se os dois itens dentro do array retornado pela função são objetos.
    // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.
    // Teste se os dois productIds terminam com 123.
  });
  it('Verifica se o retorno da função é um array', () => {
    expect(Array.isArray(productDetails('string','outra string'))).toBeTruthy();
  });
  it('Verifica se o retorno da função é um array que contém dois elementos', () => {
    expect(productDetails('string','outra string').length).toEqual(2);
  });
  it('Verifica se o retorno da função é um array que contém dois elementos', () => {
    expect(typeof productDetails('string','outra string')[0]).toBe('object');
    expect(typeof productDetails('string','outra string')[1]).toBe('object');
  });
  it('Verifica se o retorno da função é um array que contém dois elementos diferentes entre si', () => {
    expect(productDetails('string','outra string')[0]).not.toEqual(productDetails('string','outra string')[1]);   
  });
  it('Verifica se o retorno da função é um array que contém dois elementos diferentes entre si', () => {
    expect(productDetails('string','outra string')[0]).not.toEqual(productDetails('string','outra string')[1]);
    
  });
  it('Verifica se o retorno da função exibe os dois productIds com 123 no final', () => {
    expect(productDetails('string','outra string')[0].details.productId).toMatch(/123/);
    expect(productDetails('string','outra string')[1].details.productId).toMatch(/123/);
    
  });

});
