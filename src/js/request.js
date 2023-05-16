import * as tools from './tools.js';
import { initCartButtons } from './cart.js';

function url(key, subject) {
    return `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=${key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
}
const key = 'AIzaSyDQUaZUwEvbjQxO8awYggZPzgolT9-YNAw';
const spinner = document.getElementById('spinner');
const catalog = document.getElementById('catalog');

const spinnerElement = `
<div class="catalog-spinner-block" id="spinner">
    <svg class="catalog-spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
</div>
`;

function createBook(bookInfo) {
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

export function request(subject) {
    catalog.innerHTML = spinnerElement;
    fetch(url(key, subject))
        .then((response) => { return response.json(); })
        .then((data) => {
            catalog.removeChild(document.getElementById('spinner'));
            render(data.items);
        })
        .catch((error) => { console.log('error: ' + error); });

    function render(data) {
        const length = Object.keys(data).length;
        console.log(data);
        console.log('length: ' + length);
        let books = '';
        data.forEach((item, index) => {
            if (index < 6) {
                books += createBook(item);
            }
        });

        catalog.innerHTML += books;

        initCartButtons();

        if (length > 6) {
            
            let loadButton = document.createElement('button');
            loadButton.classList.add('catalog-button');
            loadButton.addEventListener('click', (event) => {
                event.target.parentElement.parentElement.removeChild(event.target.parentElement);
                render(data.splice(6));
            });
            let loadButtonBlock = document.createElement('div');
            loadButtonBlock.classList.add('load-block');
            loadButton.textContent = 'Load more';
            loadButtonBlock.appendChild(loadButton);
            catalog.appendChild(loadButtonBlock);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    request('Travel');
});