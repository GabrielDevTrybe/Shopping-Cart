const fetchProducts = async (arg) => {
  // seu código aqui
  const linkApi = `https://api.mercadolibre.com/sites/MLB/search?q=${arg}`;

  const buscaApi = await fetch(linkApi);
  const { results } = await buscaApi.json();
  return results;
};

fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
