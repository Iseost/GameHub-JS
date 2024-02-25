import { updateCartIndicator } from './cart.mjs';

export function initApp() {
  updateCartIndicator();
  getGames().then((games) => {
    fillGenres(games);
    createGameCards(games, null);
  });
}

function createGameCards(games, genre) {
  var node = document.getElementById('gameCards');
  if (node && node.hasChildNodes) {
    node.innerHTML = '';
  }
  if (!genre || genre === 'All...') {
    games.sort(sortGames).forEach(game => createGameCard(game));
  } else {
    games.filter(game => game.genre === genre).sort(sortGames).forEach(game => createGameCard(game));
  }
}

function sortGames(a, b) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}

// NOTE: Doing sorting myself although API supports sort param by sort=<field>
async function getGames() {
  const data = await fetch("https://v2.api.noroff.dev/gamehub");
  const games = await data.json();
  return games.data;
}

function fillGenres(games) {
  var select = document.getElementById('genre-select');
  var opt = document.createElement('option');
  opt.innerHTML = 'All...';
  select.appendChild(opt);
  getGameGenres(games).forEach(genre => {
    var opt = document.createElement('option');
    opt.innerHTML = genre;
    select.appendChild(opt);
  });

  select.addEventListener('change', function() {
    getGames().then((response) => {
      createGameCards(response, this.value);
    });
  }, false);
}

function getGameGenres(games) {
  var result = [];
  for (let j = 0; j < games.length; j++) {
    if (!result.includes(games[j].genre)) {
      result.push(games[j].genre);
    }
  }
  return result.sort();
}

function createGameCard(game) {
  const card = document.createElement('div');
  card.id = game.id;
  card.classList.add("card");

  const gameImage = document.createElement('img');
  gameImage.src = game.image.url;
  gameImage.classList.add('cover');


  card.appendChild(gameImage);

  const title = document.createElement("p");
  title.innerText = game.title;

  card.appendChild(title);


  card.addEventListener("click", function(event) {
    window.location.href = 'product.html?gameId=' + event.target.closest('.card').id;
  });

  document.getElementById('gameCards').appendChild(card);
}
