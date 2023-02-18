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

  return parameters + '&page-size=' + filters['pageSize'];
}
async function getNews(request) {
  const res = await fetch(request);
  let data = await res.json();
  //console.log(data.response.results[1]['webUrl']);
  renderizeNews(data);
}
function clearGrid() {
  const newsGrid = document.querySelector('#newsGrid');
  while (newsGrid.firstChild) {
    newsGrid.removeChild(newsGrid.firstChild);
  }
}

function renderizeImage(id, data) {
  const img = document.createElement('img');

  if (data.response.results[id]['fields']['thumbnail']) {
    img.src = data.response.results[id]['fields']['thumbnail'];
  } else {
    img.src = './resources/default.jpg';
  }

  img.classList.add('image');

  return img;
}
function writeHeadLine(id, data) {
  const header = document.createElement('h5');
  const content = document.createTextNode(
    data.response.results[id]['fields']['headline']
  );
  header.appendChild(content);
  return header;
}
function renderNoResults() {
  const div = document.createElement('div');
  const content = document.createTextNode('No results found.');
  div.classList.add('no__results');
  div.appendChild(content);
  newsGrid.appendChild(div);
}
function renderizeNews(data) {
  const newsGrid = document.querySelector('#newsGrid');

  clearGrid();

  if (data.response.results.length <= 0) {
    renderNoResults();
    return;
  }
  for (let id = 0; id < data.response.results.length; id++) {
    const url = document.createElement('a');
    const div = document.createElement('div');

    url.href = data.response.results[id]['webUrl'];
    url.target = '_blank';

    div.appendChild(renderizeImage(id, data));

    div.appendChild(writeHeadLine(id, data));
    div.classList.add('news__container');
    url.appendChild(div);
    newsGrid.appendChild(url);
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
