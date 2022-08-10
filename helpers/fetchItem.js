const fetchItem = async (arg) => {
  // seu código aqui
  const linkApi = `https://api.mercadolibre.com/sites/MLB/search?q=${arg}`;

  const buscaApi = await fetch(linkApi);
  const json = await buscaApi.json();
  console.log(json);
  return json;
};

fetchItem('MLB1615760527');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
