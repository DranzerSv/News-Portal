function renderNoResults() {
  const div = document.createElement('div');
  const content = document.createTextNode('No results found.');
  div.classList.add('no__results');
  div.appendChild(content);
  newsGrid.appendChild(div);
}
function clearGrid() {
  const newsGrid = document.querySelector('#newsGrid');
  while (newsGrid.firstChild) {
    newsGrid.removeChild(newsGrid.firstChild);
  }
}
function writeHeadLine(id, data) {
  const header = document.createElement('h5');
  const content = document.createTextNode(
    data.response.results[id]['fields']['headline']
  );
  header.appendChild(content);
  return header;
}
function renderizeImage(id, data) {
  const img = document.createElement('img');
  const imgUrl = data.response.results[id]['fields']['thumbnail'];

  if (imgUrl && isHtttps(imgUrl)) {
    img.src = data.response.results[id]['fields']['thumbnail'];
    console.log(data.response.results[id]['fields']['thumbnail']);
  } else {
    img.src = './resources/default.jpg';
  }

  img.classList.add('image');

  return img;
}
function isHtttps(imgUrl) {
  if (imgUrl[4] === 's') {
    return true;
  }
  return false;
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
function saveFilters(filters) {
  window.localStorage.setItem('filters', JSON.stringify(filters));
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
