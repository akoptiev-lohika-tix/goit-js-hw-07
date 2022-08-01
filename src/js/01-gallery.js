import { galleryItems } from './gallery-items.js';

const basicLightbox = window.basicLightbox;
const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');

const galleryContent = galleryItems
    .map(
        (item) =>
            `<div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</div>
    `
    )
    .join('');

gallery.insertAdjacentHTML('afterbegin', galleryContent);

let currentInstance = null;

const handleClick = (event) => {
    event.preventDefault();
    const instance = basicLightbox.create(`
    <div class="modal">
        <img src="${event.target.dataset.source}" width="900" height="700" alt="${event.target.alt}">
    </div>
`);
    instance.show(() => body.addEventListener('keyup', escapeClose));
    currentInstance = instance;
};

function escapeClose(event) {
    if (event.code === 'Escape') {
        currentInstance.close(() =>
            body.removeEventListener('keyup', escapeClose)
        );
    }
}

gallery.addEventListener('click', handleClick);

console.log(galleryItems);
