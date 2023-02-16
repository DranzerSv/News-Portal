function setDefaultFilters() {
  return {
    query: 'bleach',
    language: null,
    pageSize: 10,
  };
}
function buildRequest(filters, apiKey) {
  let parameters = objectsToParams(filters);

  return `https://content.guardianapis.com/search?${parameters}&show-fields=thumbnail,headline&${apiKey}`;
}

function objectsToParams(filters) {
  let parameters = '';
  if (filters['query']) {
    parameters += 'q=' + filters['query'];
  }
  if (filters['language']) {
    parameters += '&lang=' + filters['language'];
  }
  if (filters['pageSize'] !== 10) {
    parameters += '&page-size=' + filters['pageSize'];
  } else {
    parameters += '&page-size=10';
  }

  return parameters;
}
async function getNews(request) {
  const res = await fetch(request);
  console.log(await res.json());
}
