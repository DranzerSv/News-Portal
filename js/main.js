const apiKey = 'api-key=4a997527-1fe8-435b-8f5f-bc405e8b6954';

let filters = localStorage.getItem('savedFilters');

if (!filters) {
  filters = setDefaultFilters();
}
let request = buildRequest(filters, apiKey);

getNews(request);

let userSearch = document.querySelector('#userSearch');
let userLanguage = document.querySelector('#userLanguage');
let userPageSize = document.querySelector('#userPageSize');

console.log(userSearch.value, userLanguage.value, userPageSize.value);
