const addCardButtons = document.querySelectorAll('#add-remove-cart');
const cartHeader = document.getElementById('books-in-cart');

export function initCartButtons() {
    console.log(addCardButtons);
    console.log('localStorage.length: ' + localStorage.length);

    if (localStorage.length == 0) localStorage.setItem('booksInCart', []);

    addCardButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const currentBookId = e.target.closest('.book-item').dataset.index;

            let checkBookInCard = false;
            const booksInCart = localStorage.getItem('booksInCart');
            for (const bookId in booksInCart.split(',')) {
                console.log (bookId + ' : ' + currentBookId);
                if (bookId == currentBookId) {
                    checkBookInCard = true;
                    break;
                }
            }

            if (checkBookInCard) {
                e.target.classList.add('btn');
            } 
            //let booksInCart = localStorage.getItem('booksInCart');
            //if (booksInCart == '') booksInCart = bookId;
            //else booksInCart += ',' + bookId;
            //localStorage.setItem('booksInCart', booksInCart);
        });
    });
}

function reloadCartHeader() {
    const booksInCartCount = localStorage.getItem('booksInCart');
    if (booksInCartCount == '') cartHeader.style.display = 'none';
    else cartHeader.style.display = 'flex';
    cartHeader.textContent = booksInCartCount.split(',').length;
}


document.addEventListener('DOMContentLoaded', () => {
    reloadCartHeader();
});
