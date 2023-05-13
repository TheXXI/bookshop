const imagesData = [
    { 'img': './src/images/banner1.svg' },
    { 'img': './src/images/banner2.svg' },
    { 'img': './src/images/banner3.svg' }

];

const imageBlock = document.getElementById('slider-content');
const pointsBlock = document.querySelector('.slider-points');

function initSlider() {

    initImagesAndPoint();

    function initImagesAndPoint() {

        imagesData.forEach((image, index) => {
            let imageElement = document.createElement('img');
            imageElement.src = image.img;
            imageElement.className = `slider-image n${index}`;
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

    function moveSlide(num) {
        imageBlock.querySelector('.active').classList.remove('active');
        imageBlock.querySelector(`.n${num}`).classList.add('active');

        pointsBlock.querySelector('.active').classList.remove('active');
        pointsBlock.querySelector(`.n${num}`).classList.add('active');
    }

}

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    /*const pointsElements = document.querySelector('.slider-points').childNodes;
    const imageBlock = document.getElementById('slider-image');
    pointsElements.forEach(item => {
        item.addEventListener('click', {

        });
    });*/
});