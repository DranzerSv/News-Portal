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
function clearGrid() {
  const newsGrid = document.querySelector('#newsGrid');
  while (newsGrid.firstChild) {
    newsGrid.removeChild(newsGrid.firstChild);
  }
}
function renderizeNews(data) {
  const newsGrid = document.querySelector('#newsGrid');
  clearGrid();
  for (let item = 0; item < data.response.results.length; item++) {
    const img = document.createElement('img');
    img.src = data.response.results[item]['fields']['thumbnail'];
    newsGrid.appendChild(img);

    const header = document.createElement('h5');
    const content = document.createTextNode(
      data.response.results[item]['fields']['headline']
    );
    header.appendChild(content);
    newsGrid.appendChild(header);
  }
}
function applyFilter(filter, value) {
  filters[filter] = value;
  saveFilters(filters);
  request = buildRequest(filters, apiKey);
  getNews(request);
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
function saveFilters(filters) {
  window.localStorage.setItem('filters', JSON.stringify(filters));
}
