import { request } from './request.js';

const categoriesData = [{
        name: 'Architecture',
        subject: 'Architecture'

    },
    {
        name: 'Art & Fashion',
        subject: 'Art'
    },
    {
        name: 'Biography',
        subject: 'Biography & Autobiography'
    },
    {
        name: 'Business',
        subject: 'Business'
    },
    {
        name: 'Crafts & Hobbies',
        subject: 'Crafts & Hobbies'
    },
    {
        name: 'Drama',
        subject: 'Drama'
    },
    {
        name: 'Fiction',
        subject: 'Fiction'
    },
    {
        name: 'Food & Drink',
        subject: 'Cooking'
    },
    {
        name: 'Health & Wellbeing',
        subject: 'Health & Fitness'
    },
    {
        name: 'History & Politics',
        subject: 'History',
    },
    {
        name: 'Humor',
        subject: 'Humor'
    },
    {
        name: 'Poetry',
        subject: 'Poetry'
    },
    {
        name: 'Psychology',
        subject: 'Psychology'
    },
    {
        name: 'Science',
        subject: 'Science'
    },
    {
        name: 'Technology',
        subject: 'Technology'
    },
    {
        name: 'Travel & Maps',
        subject: 'Travel'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const categoriesListElement = document.getElementById('categories');
    categoriesData.forEach((item, index) => {
        let listElement = document.createElement('li');
        if (index == 0) {
            listElement.classList.add('active');
        }
        let buttonElement = document.createElement('button');
        buttonElement.textContent = item.name;
        buttonElement.dataset.index = index;
        buttonElement.addEventListener('click', () => {
            request(item.subject);
        });
        listElement.appendChild(buttonElement);
        categoriesListElement.appendChild(listElement);
    });
});