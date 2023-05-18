const cartHeader = document.getElementById('books-in-cart');

function getLocalsStorage() {
    return JSON.parse(localStorage.getItem('booksInCart'));
}

function setLocalsStorage(data) {
    localStorage.setItem('booksInCart', JSON.stringify(data));
}

export function initCartButtons() {
    const addCardButtons = document.querySelectorAll('#add-remove-cart');
    console.log(localStorage);

    if (getLocalsStorage().length == 0) {
        setLocalsStorage(new Array());
    }

    addCardButtons.forEach(button => {
        const currentBookId = button.closest('.book-item').dataset.index;
        let checkBookInCard = false;
        let booksInCart = getLocalsStorage();
        console.log(booksInCart);
        if (booksInCart.length > 0) {
            booksInCart.forEach(element => {
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
            let booksInCart = getLocalsStorage();
            booksInCart.forEach(element => {
                if (element == currentBookId) checkBookInCard = true;
            });

            if (checkBookInCard) {

                console.log('---------');
                console.log('   ' + booksInCart);

                let index = booksInCart.indexOf(currentBookId);
                booksInCart.splice(index, 1);

                console.log('   ' + booksInCart);
                setLocalsStorage(booksInCart);
                console.log('---------');

                e.target.classList.remove('remove-cart-button');
                button.textContent = 'buy now';

                reloadCartHeader();

                console.log('remove');
                console.log(localStorage);
            } else {
                booksInCart.push(currentBookId);
                setLocalsStorage(booksInCart);

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
    const booksInCartCount = getLocalsStorage().length;
    if (booksInCartCount == 0) cartHeader.style.display = 'none';
    else cartHeader.style.display = 'flex';
    cartHeader.textContent = booksInCartCount;
}


document.addEventListener('DOMContentLoaded', () => {
    reloadCartHeader();
});