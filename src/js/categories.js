const categoriesData = [
    'Architecture',
    'Art & Fashion',
    'Biography',
    'Business',
    'Crafts & Hobbies',
    'Drama',
    'Fiction',
    'Food & Drink',
    'Health & Wellbeing',
    'History & Politics',
    'Humor',
    'Poetry',
    'Psychology',
    'Science',
    'Technology',
    'Travel & Maps'
];

document.addEventListener('DOMContentLoaded', () => {
    const categoriesListElement = document.getElementById('categories');
    categoriesData.forEach((item, index) => {
        let listElement = document.createElement('li');
        if (index == 0) {
            listElement.classList.add('active');
        }
        let buttonElement = document.createElement('button');
        buttonElement.textContent = item;
        buttonElement.dataset.index = index;
        listElement.appendChild(buttonElement);
        categoriesListElement.appendChild(listElement);
    });
});