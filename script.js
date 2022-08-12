// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");
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
  const items = document.querySelector('.items');

  minhaApi.forEach((elemento) => {
    const { id: sku, title: name, thumbnail: image } = elemento;
    const products = createProductItemElement({ sku, name, image });
    items.appendChild(products);
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
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
    });
  }
};

const emptyButton = document.querySelector('.empty-cart');

const esvaziarCarrinho = () => {
  const olItems = document.querySelector('.cart__items');
  olItems.innerHTML = '';
};

emptyButton.addEventListener('click', esvaziarCarrinho);

window.onload = async () => {
  await listItemShopping('computador');
  cardItemsCart();
};
