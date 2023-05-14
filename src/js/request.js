function url(key, subject) {
    return `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=${key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
}
const key = 'AIzaSyDQUaZUwEvbjQxO8awYggZPzgolT9-YNAw';
const slider = document.getElementById('spinner');
const catalog = document.getElementById('catalog');

function getСurrency(code) {
    switch (code) {
        case 'RUB':
            return '₽';

        default:
            return code;

    }
}

function bookTemplate(bookInfo) {
    let rating = '';
    if (bookInfo.averageRating != undefined) {
        rating = `Rating: ${bookInfo.averageRating} <span>${bookInfo.ratingsCount} review</span>`;
    } else {
        rating = '<span>There is no rating</span>';
    }

    let price = '';
    if (bookInfo.saleInfo != undefined) {
        if (bookInfo.saleInfo.retailPrice != undefined) {
            price = `<span class="price">${getСurrency(bookInfo.saleInfo.retailPrice.currencyCode)}${toString(bookInfo.saleInfo.retailPrice.amount)}</span>`;
        } else if (bookInfo.saleInfo.listPrice != undefined) {
            price = `<span class="price">${getСurrency(bookInfo.saleInfo.listPrice.currencyCode)}${toString(bookInfo.saleInfo.listPrice.amount)}</span>`;
        } else {
            price = '<span class="price-not">Price not specified</span>';
        }
    } else {
        price = '<span class="price-not">Price not specified</span>';
    }
    /*let authorsSting = '';
    authors.forEach((item, index) => {
        if (index) {
            authorsSting += ', '
        }
        authorsSting += item
    });*/

    return `
<div class="book-item">
                    <img class="cover" src="${bookInfo.imageLinks.thumbnail}" alt="${bookInfo.title}book cover">
                    <div class="info">
                        <span class="author">${bookInfo.authors}</span>
                        <span class="title">${bookInfo.title}</span>
                        <div class="rating">
                            ${rating}
                        </div>
                        <span class="description">${bookInfo.description}</span>
                        ${price}
                        <button class="catalog-button">buy now</button>
                    </div>
                </div>
`;
}

function request(subject) {
    fetch(url(key, 'Business'))
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
                console.log(index);
                const bookInfo = item.volumeInfo;
                const bookElement = bookTemplate(bookInfo);
                books += bookElement;
            }
        });
        console.log(books);
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