import { handleCart, CART_ID, ADD_TO_CART, REMOVE_FROM_CART } from './cart.mjs';

export function displayGame() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('gameId');
  getGame(gameId).then((game) => {
    const title = document.getElementById('content').querySelector('.title').innerHTML = game.title;
    createGameCard(game);
  });
}

export function displayGameById(gameId) {
  getGame(gameId).then((game) => {
    createGameCard(game);
  });
}

async function getGame(gameId) {
  const data = await fetch("https://v2.api.noroff.dev/gamehub/" + gameId);
  const game = await data.json();
  return game.data;
}

function createGameCard(game) {
  const card = document.createElement('div');
  card.id = game.id;
  card.classList.add("card");

  const gameImage = document.createElement('img');
  gameImage.src = game.image.url;
  gameImage.classList.add('cover');


  card.appendChild(gameImage);

  //Game title
  const title = document.createElement("p");
  // title.classList.add("small_title");
  title.innerText = game.title;

  card.appendChild(title);

  let cartData = window.sessionStorage.getItem(CART_ID);

  const cartBtn = document.createElement("button");
  cartBtn.textContent = !cartData || !cartData.includes(game.id) ? ADD_TO_CART : REMOVE_FROM_CART;
  cartBtn.addEventListener("click", handleCart);

  card.appendChild(cartBtn);

  document.getElementById('gameCard').appendChild(card);
}