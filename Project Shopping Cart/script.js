const getSection = document.querySelector('.items');
const cartAdd = document.querySelector('.cart__items');
let newArray = [];
const getSaved = JSON.parse(getSavedCartItems());
const takeCart = document.querySelector('.cart');
const emptyButton = document.querySelector('.empty-cart');

const elementLoading = () => {
  const loading = document.createElement('p');
  loading.classList.add('loading');
  loading.innerText = 'carregando...';
  getSection.appendChild(loading);
};
const totalSum = () => {
  const prices = document.querySelector('.total-price');
  let value = 0;
  newArray.forEach((element) => {
    value += element.price;
  });
  if (prices === null) {
    const createSum = document.createElement('p');
    createSum.classList.add('total-price');
    createSum.innerText = `Total price :\nR$${value}`;
    createSum.style.textAlign = 'center';
    createSum.style.border = '1px solid grey';
    createSum.style.width = '100%';
    createSum.style.backgroundColor = 'red';
    createSum.style.padding = ' 1em';

    takeCart.insertBefore(createSum, takeCart.firstChild);
    // takeCart.appendChild(createSum);
  } else {
    prices.innerText = `Total price :\nR$${value}`;
  }
};

function getCarts() {
  const capItem = document.getElementsByClassName('item__add');
  return capItem;
}

function cartItemClickListener(event) {
  const element = event.target;
  const saves = JSON.parse(getSavedCartItems());
  takeExcluded = saves.filter((e) => !element.innerText.includes(e.id));
  newArray = takeExcluded;
  console.log(takeExcluded);
  localStorage.removeItem('cartItems');
  saveCartItems(takeExcluded);
  element.remove();
  totalSum();
}

// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  //  cartAdd.appendChild(createProductImageElement(thumbnail));
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.style.display = 'flex';
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const cartRequisition = async () => {
  const capItem = getCarts();
  const productsFetch = await fetchProducts('computador');
  const products = await productsFetch.results;

  [...capItem].forEach((button, index) => {
    button.addEventListener('click', async () => {
      const response = await fetchItem(products[index].id);
      cartAdd.appendChild(createCartItemElement(response));
       const getEle = cartAdd.lastChild;
       getEle.appendChild(createProductImageElement(response.thumbnail));
      newArray.push(response);
      saveCartItems(newArray);
      totalSum();
    });
  });
};

const listProducts = async () => {
  elementLoading();
  const productsFetch = await fetchProducts('computador');
  document.querySelector('.loading').remove();
  const products = productsFetch.results;
  const productsMapped = products.map((e) => {
    const { id, title, thumbnail } = e;
    const obj = { id, title, thumbnail };
    return obj;
  });
  for (let i = 0; i < productsMapped.length; i += 1) {
    getSection.appendChild(createProductItemElement(productsMapped[i]));
  }
  await cartRequisition();
};
function GetItems() {
  if (getSaved !== null) {
    getSaved.forEach((item) => {
      newArray.push(item);
      cartAdd.appendChild(createCartItemElement(item));
      totalSum();
    });
  } else {
    newArray = [];
    totalSum();
  }
}
emptyButton.addEventListener('click', removeAllCarts = () => {
const cartRemove = document.querySelectorAll('.cart__item');
cartRemove.forEach((e) => {
  e.remove();
});
newArray = [];
saveCartItems([]);
totalSum();
});
window.onload = () => {
  listProducts();
  GetItems();
};