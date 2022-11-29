/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { checkAuth } from './fetch-utils.js';
import { createListItem } from './fetch-utils.js';
/* Get DOM Elements */
const form = document.querySelector('.item-form');
const listEl = document.querySelector('.list');
/* State */

/* Events */
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');
    await createListItem(item, quantity);
    form.reset();
});

/* Display Functions */
