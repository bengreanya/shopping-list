/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { checkAuth } from './fetch-utils.js';
import { createListItem } from './fetch-utils.js';
import { getListItems } from './fetch-utils.js';
import { editListItem } from './fetch-utils.js';
import { renderListItem } from './render-utils.js';
/* Get DOM Elements */
const form = document.querySelector('.item-form');
const listEl = document.querySelector('.list');
const error = document.querySelector('#error');
/* State */

/* Events */
window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');
    form.reset();

    const newItem = await createListItem(item, quantity);
    if (newItem) {
        console.log(newItem);
        fetchAndDisplayList();
    } else {
        error.textContent = 'Whoopsies-something went wrong';
    }
});

/* Display Functions */
async function fetchAndDisplayList() {
    listEl.textContent = '';
    const list = await getListItems();
    if (list) {
        for (let item of list) {
            const listItemEl = renderListItem(item);
            listItemEl.addEventListener('click', async () => {
                await editListItem(item);
                await fetchAndDisplayList();
            });
            listEl.append(listItemEl);
        }
    }
}
