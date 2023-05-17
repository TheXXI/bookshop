export function getСurrency(code) {
    switch (code) {
        case 'RUB':
            return '₽';
        default:
            return code;

    }
}

export function ratingStars(rating) {
    const star = './src/images/icons/star.svg';
    const starHalfFill = './src/images/icons/star_half_fill.svg';
    const starFill = './src/images/icons/star_fill.svg';

    let starsCount = 0;
    let result = '';

    for (let i = 0; i < Math.trunc(rating); i++) {
        result += `<img src="${starFill}" alt="Rating star">`;
        starsCount++;
    }

    if (starsCount == 5) return result;

    if (rating % 1 > 0) {
        result += `<img src="${starHalfFill}" alt="Rating star">`;
        starsCount++;
        if (starsCount == 5) return result;
    }

    for (let i = starsCount; i < 5; i++) {
        result += `<img src="${star}" alt="Rating star">`;
        starsCount++;
    }
    return result;
}

export function replaceAllInString(string, search, replace) {
    return string.split(search).join(replace);
}