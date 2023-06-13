const imagesData = [
    { 'img': './dist/images/banner1.svg' },
    { 'img': './dist/images/banner2.svg' },
    { 'img': './dist/images/banner3.svg' }

];

const imageChangeInSeconds = 5;

const imageBlock = document.getElementById('slider-content');
const pointsBlock = document.getElementById('slider-points');

const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

function initSlider() {

    initImagesAndPoint();

    initAutoplay();

    initMobileButtons();

    function initImagesAndPoint() {

        imagesData.forEach((image, index) => {
            let imageElement = document.createElement('img');
            imageElement.src = image.img;
            imageElement.className = `slider-image n${index}`;
            imageElement.dataset.index = index;
            if (index == 0) {
                imageElement.classList.add('active');
            }
            imageElement.alt = 'Slider image';
            imageBlock.appendChild(imageElement);

            let pointElement = document.createElement('button');
            pointElement.className = `point n${index}`;
            if (index == 0) {
                pointElement.classList.add('active');
            }

            pointElement.addEventListener('click', event => {
                const num = event.target.classList[1][1];
                moveSlide(num);
            });

            pointsBlock.appendChild(pointElement);

        });
    }
    
    function initMobileButtons() {
        nextButton.addEventListener('click', () => {
            let currentSlideNumber = +imageBlock.querySelector('.active').dataset.index;
            moveSlide(currentSlideNumber < 2 ? currentSlideNumber + 1 : 0);
        });

        prevButton.addEventListener('click', () => {
            let currentSlideNumber = +imageBlock.querySelector('.active').dataset.index;
            moveSlide(currentSlideNumber > 0 ? currentSlideNumber - 1 : 2);
        });
    }

    function initAutoplay() {
        setInterval(() => {
            let currentSlideNumber = +imageBlock.querySelector('.active').dataset.index;
            moveSlide(currentSlideNumber < 2 ? currentSlideNumber + 1 : 0);
        }, imageChangeInSeconds * 1000);
    }

    function moveSlide(num) {
        imageBlock.querySelector('.active').classList.remove('active');
        imageBlock.querySelector(`.n${num}`).classList.add('active');

        pointsBlock.querySelector('.active').classList.remove('active');
        pointsBlock.querySelector(`.n${num}`).classList.add('active');
    }

}

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
});