import './styles.css';
import fetchImages from './js/apiService.js';
import { searchForm, galleryWrap, loadMore } from './js/refs.js';
import imageCard from './templates/image-card.hbs';

let searchQuery = "";
let page = 1;
loadMore.classList.add('is-hidden');


function updateGallery(pics) {
	galleryWrap.innerHTML = "";
	const markup = imageCard(pics);
	galleryWrap.insertAdjacentHTML('beforeend', markup);
};

function loadMorePics(pics) {
	const markup = imageCard(pics);
	galleryWrap.insertAdjacentHTML('beforeend', markup);
};

searchForm.addEventListener('submit', (event) => {
	event.preventDefault();
    page = 1;
    loadMore.classList.remove('is-hidden');
	searchQuery = event.currentTarget.elements['query'].value;
	if (!searchQuery) {
		loadMore.classList.add('is-hidden');
		galleryWrap.innerHTML = "";
		return;
	}
	return fetchImages(searchQuery, page)
		.then(pics => {
			if (pics.length < 12) {
				loadMore.classList.add('is-hidden');
			};
			updateGallery(pics);
			page += 1
		});
});

loadMore.addEventListener('click', (event) => {
	fetchImages(searchQuery, page)
		.then(pics => {
			if (pics.length < 12) {
                loadMore.classList.add('is-hidden');
			};
			loadMorePics(pics);
			page += 1
		});
	window.scrollTo({
		top: document.body.scrollHeight,
		behavior: "smooth"
	});
});