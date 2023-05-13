function url(key, subject) {
    return `https://www.googleapis.com/books/v1/volumes?q="subject:${subject}"&key=${key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
}
const key = 'AIzaSyDQUaZUwEvbjQxO8awYggZPzgolT9-YNAw';
const slider = document.getElementById('spinner');
const catalog = document.getElementById('catalog');

function bookTemplate(coverLink, authors, title, description) {
    /*let authorsSting = '';
    authors.forEach((item, index) => {
        if (index) {
            authorsSting += ', '
        }
        authorsSting += item
    });*/

    return `
<div class="book-item">
                    <img class="cover" src="${coverLink}" alt="${title}book cover">
                    <div class="info">
                        <span class="author">${authors}</span>
                        <span class="title">${title}</span>
                        <div class="rating">
                            <img src="./src/images/icons/fill_star.svg" alt="Rating star">
                            <img src="./src/images/icons/fill_star.svg" alt="Rating star">
                            <img src="./src/images/icons/fill_star.svg" alt="Rating star">
                            <img src="./src/images/icons/fill_star.svg" alt="Rating star">
                            <img src="./src/images/icons/fill_star.svg" alt="Rating star">
                            <span>353 review</span>
                        </div>
                        <span class="description">${description}</span>
                        <span class="price">$4.99</span>
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
            console.log(data.items[1].volumeInfo);
            render(data.items);
        })
        .catch((error) => { console.log('error: ' + error); });


    function render(data) {
        let books = '';
        data.forEach((item, index) => {
            console.log(index);
            const bookInfo = item.volumeInfo;
            const bookElement = bookTemplate(bookInfo.imageLinks.thumbnail, bookInfo.authors, bookInfo.title, bookInfo.description);
            books += bookElement;
        });
        console.log(books);
        catalog.innerHTML = books;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    request('Architecture');
});