function setDefaultFilters() {
  return {
    query: '',
    language: '',
    pageSize: 10,
  };
}
function showStoredFilters(filters) {
  let search = document.querySelector(`#userSearch`);
  let language = document.querySelector(
    `#userLanguage option[value="${filters['language']}"]`
  );
  console.log(filters['language']);
  let pageSize = document.querySelector(
    `#userPageSize option[value="${filters['pageSize']}"]`
  );
  search.value = filters['query'];
  language.selected = true;
  pageSize.selected = true;
}
function buildRequest(filters, apiKey) {
  let parameters = objectsToParams(filters);

  return `https://content.guardianapis.com/search?${parameters}&show-fields=thumbnail,headline&${apiKey}`;
}

async function getNews(request) {
  const res = await fetch(request);
  let data = await res.json();
  renderizeNews(data);
}

function applyFilter(filter, value) {
  filters[filter] = value;
  saveFilters(filters);
  request = buildRequest(filters, API_KEY);
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
