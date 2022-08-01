import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

const galleryContent = galleryItems
    .map(
        (item) =>
            `<a class="gallery__item" href="${item.original}">
  <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
</a>
    `
    )
    .join('');

gallery.insertAdjacentHTML('afterbegin', galleryContent);

new SimpleLightbox('.gallery a', {
    showCounter: false,
    captionsData: 'alt',
    captionDelay: 250,
});

console.log(galleryItems);
