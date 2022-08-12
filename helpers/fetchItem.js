const fetchItem = async (item) => {
  // seu código aqui
  const linkApi = `https://api.mercadolibre.com/items/${item}`;

  const buscaApi = await fetch(linkApi);
  const json = await buscaApi.json();
  return json;
};

// fetchItem('MLB1615760527');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
