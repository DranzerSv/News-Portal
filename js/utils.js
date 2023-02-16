function setDefaultFilters() {
  return {
    query: null,
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
  let data = await res.json();
  renderizeNews(data);
}

function renderizeNews(data) {
  for (let item = 0; item < data.response.results.length; item++) {
    const img = document.createElement('img');
    img.src = data.response.results[item]['fields']['thumbnail'];
    document.body.appendChild(img);

    const header = document.createElement('h5');
    const content = document.createTextNode(
      data.response.results[item]['fields']['headline']
    );
    header.appendChild(content);
    document.body.appendChild(header);
  }
}
function applyFilter() {
  console.log(this.value);
}
function debounce(func, duration) {
  let timeout;

  return function (...args) {
    const effect = () => {
      timeout = null;
      return func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(effect, duration);
  };
}
