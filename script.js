// const { fetchProducts } = require("./helpers/fetchProducts");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const { fetchItem } = require("./helpers/fetchItem");
const olItems = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const listItemShopping = async (product) => {
  const minhaApi = await fetchProducts(product);
  document.querySelector('div.loading').remove();

  const items = document.querySelector('.items');

  minhaApi.forEach((elemento) => {
    const { id: sku, title: name, thumbnail: image } = elemento;
    const products = createProductItemElement({ sku, name, image });
    items.appendChild(products);
  });
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;]

const showPrices = async (total) => {
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = total;
};

const somando = async () => {
  const productsList = await document.querySelectorAll('.cart__items li');
  let total = 0;
  productsList.forEach((produto) => {
    total += parseFloat(produto.innerText.split('$')[1]);
  });
  showPrices(total);
};

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  event.target.remove();
  somando();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const arrItems = [];

const showLocalStorage = (item) => {
  arrItems.push(item);
  saveCartItems(arrItems);
};

const chamaOl = document.querySelector('.cart__items');

const newFunc = (param) => fetchItem(param);

const cardItemsCart = async () => {
  const chamaButton = document.querySelectorAll('.item__add');
  for (let index = 0; index < chamaButton.length; index += 1) {
    chamaButton[index].addEventListener('click', async () => {
      const id = chamaButton[index].parentElement.firstChild.innerText;
      const product = await newFunc(id);
      const { id: sku, title: name, price: salePrice } = product;
      const criaElement = createCartItemElement({ sku, name, salePrice });
      chamaOl.appendChild(criaElement);
      showLocalStorage(criaElement.innerHTML);
      somando();
    });
  }
};

const emptyButton = document.querySelector('.empty-cart');

const esvaziarCarrinho = () => {
  olItems.innerHTML = '';
  somando();
};

emptyButton.addEventListener('click', esvaziarCarrinho);

const render = () => {
  const searchItems = getSavedCartItems('cartItems');
  searchItems.forEach((element) => {
    const criaLi = document.createElement('li');
    criaLi.className = 'cart__item';
    criaLi.innerText = element;
    olItems.appendChild(criaLi);
  });
};

const clearLocalStorage = () => {
  const liLocalStorage = olItems.querySelectorAll('.cart__item');
  const result = liLocalStorage.forEach((e) => {
    e.addEventListener('click', cartItemClickListener);
  });
  return result;
};

window.onload = async () => {
  await listItemShopping('computador');
  cardItemsCart();
  render();
  clearLocalStorage();
  somando();
};
