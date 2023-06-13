import { createBookNode } from './createBookNode.js';
import { initCartButtons } from './cart.js';
import { getSpinner} from './spinnerNode.js';

function url(key, subject) {
    return `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=${key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
}
const key = 'AIzaSyDQUaZUwEvbjQxO8awYggZPzgolT9-YNAw';
const booksOnPage = 6;

const catalog = document.getElementById('catalog');
const spinnerElement = getSpinner();

export function request(subject = 'Architecture') {
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
        let books = '';
        data.forEach((item, index) => {
            if (index < booksOnPage) {
                books += createBookNode(item);
            }
        });

        catalog.innerHTML += books;



        if (length > booksOnPage) {

            let loadButton = document.createElement('button');
            loadButton.classList.add('catalog-button');
            loadButton.addEventListener('click', (event) => {
                event.target.parentElement.parentElement.removeChild(event.target.parentElement);
                render(data.splice(booksOnPage));
            });
            let loadButtonBlock = document.createElement('div');
            loadButtonBlock.classList.add('load-block');
            loadButton.textContent = 'Load more';
            loadButtonBlock.appendChild(loadButton);
            catalog.appendChild(loadButtonBlock);
        }

        initCartButtons();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    request();
});