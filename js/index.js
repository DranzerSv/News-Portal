const API_KEY = 'api-key=4a997527-1fe8-435b-8f5f-bc405e8b6954';
let userSearch = document.querySelector('#userSearch');
let userLanguage = document.querySelector('#userLanguage');
let userPageSize = document.querySelector('#userPageSize');

let filters = JSON.parse(localStorage.getItem('filters'));

if (!filters) {
  filters = setDefaultFilters();
}

showStoredFilters(filters);
let request = buildRequest(filters, API_KEY);

getNews(request);

userSearch.addEventListener(
  'input',
  debounce(function () {
    applyFilter('query', this.value);
  }, 890)
);
userLanguage.addEventListener('change', function () {
  applyFilter('language', this.value);
});
userPageSize.addEventListener('change', function () {
  applyFilter('pageSize', this.value);
});
