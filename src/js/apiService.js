const apiKey = '19267083-f7a103736789b336d201af38a';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(searchQuery, pageNum) {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNum}&per_page=12&key=${apiKey}`;

    return fetch(url)
        .then(response => response.json())
        .then(pics => pics.hits)
        .catch(`Error`);
};

export default fetchImages;