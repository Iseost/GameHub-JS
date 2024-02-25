import { displayGameById } from './product.mjs';

export const CART_ID = 'gamehubCart';
export const ADD_TO_CART = 'Add to cart';
export const REMOVE_FROM_CART = 'Remove from cart';

export function displayCart() {
  var cartData = window.sessionStorage.getItem(CART_ID)?.split(',') ?? [];
  cartData.forEach(id => displayGameById(id));
}

export function handleCart(event) {
  const gameId = event.target.closest('.card').id;
  const btn = event.target.closest('.card').querySelector('button');
  var cartData = window.sessionStorage.getItem(CART_ID)?.split(',') ?? [];

  if (!cartData.includes(gameId)) {
    cartData.push(gameId);
    btn.textContent = REMOVE_FROM_CART;
  } else {
    cartData = cartData.filter(id => id !== gameId);
    btn.textContent = ADD_TO_CART;
  }

  if (cartData.length == 0) {
    window.sessionStorage.removeItem(CART_ID);
  } else {
    window.sessionStorage.setItem(CART_ID, cartData);
  }
}

export function updateCartIndicator() {
  const btn = document.getElementById('cart').querySelector('button');
  var cartData = window.sessionStorage.getItem(CART_ID)?.split(',') ?? [];
  if (cartData.length == 0) {
    btn.textContent = 'No products in cart';
    btn.disabled = true;
  } else {
    btn.textContent = cartData.length + ' items in cart';
    btn.disabled = false;
  }
}