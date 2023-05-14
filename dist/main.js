/*! For license information please see main.js.LICENSE.txt */
(()=>{var __webpack_modules__={"./src/scss/base.scss":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bookshop/./src/scss/base.scss?")},"./src/app.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/base.scss */ "./src/scss/base.scss");\n/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/slider.js */ "./src/js/slider.js");\n/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_slider_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_request_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/request.js */ "./src/js/request.js");\n/* harmony import */ var _js_request_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_request_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _js_categories_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/categories.js */ "./src/js/categories.js");\n\n\n\n\n\n\n//# sourceURL=webpack://bookshop/./src/app.js?')},"./src/js/categories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request.js */ \"./src/js/request.js\");\n/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_request_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst categoriesData = [{\n        name: 'Architecture',\n        subject: 'Architecture'\n\n    },\n    {\n        name: 'Art & Fashion',\n        subject: 'Art'\n    },\n    {\n        name: 'Biography',\n        subject: 'Biography & Autobiography'\n    },\n    {\n        name: 'Business',\n        subject: 'Business'\n    },\n    {\n        name: 'Crafts & Hobbies',\n        subject: 'Crafts & Hobbies'\n    },\n    {\n        name: 'Drama',\n        subject: 'Drama'\n    },\n    {\n        name: 'Fiction',\n        subject: 'Fiction'\n    },\n    {\n        name: 'Food & Drink',\n        subject: 'Cooking'\n    },\n    {\n        name: 'Health & Wellbeing',\n        subject: 'Health & Fitness'\n    },\n    {\n        name: 'History & Politics',\n        subject: 'History',\n    },\n    {\n        name: 'Humor',\n        subject: 'Humor'\n    },\n    {\n        name: 'Poetry',\n        subject: 'Poetry'\n    },\n    {\n        name: 'Psychology',\n        subject: 'Psychology'\n    },\n    {\n        name: 'Science',\n        subject: 'Science'\n    },\n    {\n        name: 'Technology',\n        subject: 'Technology'\n    },\n    {\n        name: 'Travel & Maps',\n        subject: 'Travel'\n    }\n];\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const categoriesListElement = document.getElementById('categories');\n    categoriesData.forEach((item, index) => {\n        let listElement = document.createElement('li');\n        if (index == 0) {\n            listElement.classList.add('active');\n        }\n        let buttonElement = document.createElement('button');\n        buttonElement.textContent = item.name;\n        buttonElement.dataset.index = index;\n        buttonElement.addEventListener('click', () => {\n            (0,_request_js__WEBPACK_IMPORTED_MODULE_0__.request)(item.subject);\n        });\n        listElement.appendChild(buttonElement);\n        categoriesListElement.appendChild(listElement);\n    });\n});\n\n//# sourceURL=webpack://bookshop/./src/js/categories.js?")},"./src/js/request.js":()=>{eval("function url(key, subject) {\n    return `https://www.googleapis.com/books/v1/volumes?q=\"subject:${subject}\"&key=${key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;\n}\nconst key = 'AIzaSyDQUaZUwEvbjQxO8awYggZPzgolT9-YNAw';\nconst slider = document.getElementById('spinner');\nconst catalog = document.getElementById('catalog');\n\nfunction getСurrency(code) {\n    switch (code) {\n        case 'RUB':\n            return '₽';\n\n        default:\n            return code;\n\n    }\n}\n\nfunction bookTemplate(bookInfo) {\n    let rating = '';\n    if (bookInfo.averageRating != undefined) {\n        rating = `Rating: ${bookInfo.averageRating} <span>${bookInfo.ratingsCount} review</span>`;\n    } else {\n        rating = '<span>There is no rating</span>';\n    }\n\n    let price = '';\n    if (bookInfo.saleInfo != undefined) {\n        if (bookInfo.saleInfo.retailPrice != undefined) {\n            price = `<span class=\"price\">${getСurrency(bookInfo.saleInfo.retailPrice.currencyCode)}${toString(bookInfo.saleInfo.retailPrice.amount)}</span>`;\n        } else if (bookInfo.saleInfo.listPrice != undefined) {\n            price = `<span class=\"price\">${getСurrency(bookInfo.saleInfo.listPrice.currencyCode)}${toString(bookInfo.saleInfo.listPrice.amount)}</span>`;\n        } else {\n            price = '<span class=\"price-not\">Price not specified</span>';\n        }\n    } else {\n        price = '<span class=\"price-not\">Price not specified</span>';\n    }\n    /*let authorsSting = '';\n    authors.forEach((item, index) => {\n        if (index) {\n            authorsSting += ', '\n        }\n        authorsSting += item\n    });*/\n\n    return `\n<div class=\"book-item\">\n                    <img class=\"cover\" src=\"${bookInfo.imageLinks.thumbnail}\" alt=\"${bookInfo.title}book cover\">\n                    <div class=\"info\">\n                        <span class=\"author\">${bookInfo.authors}</span>\n                        <span class=\"title\">${bookInfo.title}</span>\n                        <div class=\"rating\">\n                            ${rating}\n                        </div>\n                        <span class=\"description\">${bookInfo.description}</span>\n                        ${price}\n                        <button class=\"catalog-button\">buy now</button>\n                    </div>\n                </div>\n`;\n}\n\nfunction request(subject) {\n    fetch(url(key, subject))\n        .then((response) => { return response.json(); })\n        .then((data) => {\n            console.log(data);\n            render(data.items);\n        })\n        .catch((error) => { console.log('error: ' + error); });\n\n\n    function render(data) {\n        let books = '';\n        data.forEach((item, index) => {\n            if (index < 6) {\n                console.log(index);\n                const bookInfo = item.volumeInfo;\n                const bookElement = bookTemplate(bookInfo);\n                books += bookElement;\n            }\n        });\n\n        catalog.innerHTML = books;\n        if (data.lenght > 5) {\n            let loadButton = document.createElement('button');\n            loadButton.classList.add('catalog-button');\n            loadButton.addEventListener('click', () => loadMoreBooks(data.splice(0, 6)));\n            let loadButtonBlock = document.createElement('div');\n            loadButtonBlock.classList.add('load-block');\n            loadButtonBlock.appendChild(loadButton);\n            catalog.appendChild(loadButtonBlock);\n        }\n    }\n\n    function loadMoreBooks(data) {\n        console.log(data.lenght);\n    }\n}\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    request('Travel');\n});\n\n//# sourceURL=webpack://bookshop/./src/js/request.js?")},"./src/js/slider.js":()=>{eval("const imagesData = [\n    { 'img': './src/images/banner1.svg' },\n    { 'img': './src/images/banner2.svg' },\n    { 'img': './src/images/banner3.svg' }\n\n];\n\nconst imageBlock = document.getElementById('slider-content');\nconst pointsBlock = document.querySelector('.slider-points');\n\nfunction initSlider() {\n\n    initImagesAndPoint();\n\n    function initImagesAndPoint() {\n\n        imagesData.forEach((image, index) => {\n            let imageElement = document.createElement('img');\n            imageElement.src = image.img;\n            imageElement.className = `slider-image n${index}`;\n            if (index == 0) {\n                imageElement.classList.add('active');\n            }\n            imageElement.alt = toString(index) + 'slider image';\n            imageBlock.appendChild(imageElement);\n\n            let pointElement = document.createElement('button');\n            pointElement.className = `point n${index}`;\n            if (index == 0) {\n                pointElement.classList.add('active');\n            }\n\n            pointElement.addEventListener('click', event => {\n                const num = event.target.classList[1][1];\n                moveSlide(num);\n            });\n\n            pointsBlock.appendChild(pointElement);\n\n        });\n    }\n\n    function moveSlide(num) {\n        imageBlock.querySelector('.active').classList.remove('active');\n        imageBlock.querySelector(`.n${num}`).classList.add('active');\n\n        pointsBlock.querySelector('.active').classList.remove('active');\n        pointsBlock.querySelector(`.n${num}`).classList.add('active');\n    }\n\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    initSlider();\n    /*const pointsElements = document.querySelector('.slider-points').childNodes;\n    const imageBlock = document.getElementById('slider-image');\n    pointsElements.forEach(item => {\n        item.addEventListener('click', {\n\n        });\n    });*/\n});\n\n//# sourceURL=webpack://bookshop/./src/js/slider.js?")}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(n,{a:n}),n},__webpack_require__.d=(e,n)=>{for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./src/app.js")})();