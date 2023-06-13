import * as tools from './tools.js';

export function createBookNode(bookInfo) {
    const bookId = bookInfo.id;
    bookInfo = bookInfo.volumeInfo;

    let cover = '';
    if (bookInfo.imageLinks && bookInfo.imageLinks.thumbnail) cover = `<img class="cover" src="${bookInfo.imageLinks.thumbnail}" alt="Book cover">`;
    else cover = '<div class="no-cover">The cover is missing</div>';

    let rating = '';
    if (bookInfo.averageRating) {
        rating = `${tools.ratingStars(bookInfo.averageRating)} <span>${bookInfo.ratingsCount} review</span>`;
    } else rating = '<span>There is no rating</span>';

    let price = '';
    if (bookInfo.saleInfo && bookInfo.saleInfo.retailPrice) {
        price = `<span class="price">${tools.getСurrency(bookInfo.saleInfo.retailPrice.currencyCode)}${toString(bookInfo.saleInfo.retailPrice.amount)}</span>`;
    } else price = '<span class="price-not">Price not specified</span>';

    return `
    <div class="book-item" data-index="${bookId}">
        ${cover}
        <div class="info">
            <span class="author">${bookInfo.authors ? bookInfo.authors : 'Unknown author'}</span>
            <span class="title">${bookInfo.title ? bookInfo.title : 'Unknown book name'}</span>
            <div class="rating">${rating}</div>
            <span class="description">${bookInfo.description ? bookInfo.description : 'Unknown description'}</span>
            ${price}
            <button class="catalog-button" id="add-remove-cart">buy now</button>
        </div>
    </div>`;
}