const fetchProducts = async (arg) => {
  // seu código aqui
  const linkApi = `https://api.mercadolibre.com/sites/MLB/search?q=${arg}`;
  
  const buscaApi = await fetch(linkApi);
  const json = await buscaApi.json();
  console.log(json);
  return json;
};

fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
