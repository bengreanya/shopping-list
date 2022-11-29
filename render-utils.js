export function renderListItem(item) {
    const listItemEl = document.createElement('li');
    listItemEl.textContent = `${item.item}--${item.quantity}`;
    return listItemEl;
}
