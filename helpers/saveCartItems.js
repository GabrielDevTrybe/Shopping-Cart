const saveCartItems = (item) => {
  // seu código aqui
  localStorage.setItem('cartItems', JSON.stringify(item));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
