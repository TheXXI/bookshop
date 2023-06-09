const imagesData = [
    { 'img': './dist/images/banner1.svg' },
    { 'img': './dist/images/banner2.svg' },
    { 'img': './dist/images/banner3.svg' }

];

const imageBlock = document.getElementById('slider-content');
const pointsBlock = document.querySelector('.slider-points');

function initSlider() {

    initImagesAndPoint();

    initAutoplay();

    function initImagesAndPoint() {

        imagesData.forEach((image, index) => {
            let imageElement = document.createElement('img');
            imageElement.src = image.img;
            imageElement.className = `slider-image n${index}`;
            imageElement.dataset.index = index;
            if (index == 0) {
                imageElement.classList.add('active');
            }
            imageElement.alt = toString(index) + 'slider image';
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

    function initAutoplay() {
        setInterval(() => {
            let currentSlideNumber = +imageBlock.querySelector('.active').dataset.index;
            moveSlide(currentSlideNumber < 2 ? currentSlideNumber + 1 : 0);
        }, 5000);
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