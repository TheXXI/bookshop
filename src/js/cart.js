import { replaceAllInString } from './tools.js';
const cartHeader = document.getElementById('books-in-cart');

export function initCartButtons() {
    const addCardButtons = document.querySelectorAll('#add-remove-cart');
    console.log(localStorage);

    if (localStorage.length == 0) localStorage.setItem('booksInCart', '');

    addCardButtons.forEach(button => {
        const currentBookId = button.closest('.book-item').dataset.index;
        let checkBookInCard = false;
        let booksInCart = localStorage.getItem('booksInCart');
        if (booksInCart != '') {
            booksInCart.split(',').forEach((element, index) => {
                if (element == currentBookId) checkBookInCard = true;

            });

            if (checkBookInCard) {
                button.classList.add('remove-cart-button');
                button.textContent = 'in the cart';
            }
        }

        button.addEventListener('click', (e) => {

            const currentBookId = e.target.closest('.book-item').dataset.index;

            let checkBookInCard = false;
            let booksInCart = localStorage.getItem('booksInCart');
            booksInCart.split(',').forEach((element, index) => {
                if (element == currentBookId) checkBookInCard = true;
            });

            if (checkBookInCard) {

                console.log('---------');
                console.log('  ' + typeof(booksInCart));
                console.log('  >' + booksInCart + '<');
                booksInCart = booksInCart.replace('X8KlDwAAQBAJ', '');
                console.log('  >' + booksInCart + '<');
                localStorage.setItem('booksInCart', booksInCart);
                console.log('---------');

                e.target.classList.remove('remove-cart-button');
                button.textContent = 'buy now';

                reloadCartHeader();

                console.log('remove');
                console.log(localStorage);
            } else {
                if (booksInCart == '') booksInCart = currentBookId;
                else booksInCart += ',' + currentBookId;
                localStorage.setItem('booksInCart', booksInCart);

                e.target.classList.add('remove-cart-button');
                button.textContent = 'in the cart';

                reloadCartHeader();

                console.log('add');
                console.log(localStorage);
            }


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