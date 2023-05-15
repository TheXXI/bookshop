import * as tools from './tools.js';

function url(key, subject) {
    return `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=${key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
}
const key = 'AIzaSyDQUaZUwEvbjQxO8awYggZPzgolT9-YNAw';
const slider = document.getElementById('spinner');
const catalog = document.getElementById('catalog');

function bookTemplate(bookInfo) {
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
    <div class="book-item">
        ${cover}
        <div class="info">
            <span class="author">${bookInfo.authors ? bookInfo.authors : 'Unknown author'}</span>
            <span class="title">${bookInfo.title ? bookInfo.title : 'Unknown book name'}</span>
            <div class="rating">${rating}</div>
            <span class="description">${bookInfo.description ? bookInfo.description : 'Unknown description'}</span>
            ${price}
            <button class="catalog-button">buy now</button>
        </div>
    </div>`;
}

export function request(subject) {
    fetch(url(key, subject))
        .then((response) => { return response.json(); })
        .then((data) => {
            console.log(data);
            render(data.items);
        })
        .catch((error) => { console.log('error: ' + error); });

    function render(data) {
        let books = '';
        data.forEach((item, index) => {
            if (index < 6) {
                const bookInfo = item.volumeInfo;
                const bookElement = bookTemplate(bookInfo);
                books += bookElement;
            }
        });

        catalog.innerHTML = books;
        if (data.lenght > 5) {
            let loadButton = document.createElement('button');
            loadButton.classList.add('catalog-button');
            loadButton.addEventListener('click', () => loadMoreBooks(data.splice(0, 6)));
            let loadButtonBlock = document.createElement('div');
            loadButtonBlock.classList.add('load-block');
            loadButtonBlock.appendChild(loadButton);
            catalog.appendChild(loadButtonBlock);
        }
    }

    function loadMoreBooks(data) {
        console.log(data.lenght);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    request('Travel');
});