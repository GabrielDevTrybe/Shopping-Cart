const getSavedCartItems = (item) => JSON.parse(localStorage.getItem(item));

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
