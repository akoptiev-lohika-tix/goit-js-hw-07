import { galleryItems } from './gallery-items.js';

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
gallery.addEventListener('click', handleClick);

let currentInstance = null;

function handleClick(event) {
    event.preventDefault();
    if (event.target.tagName !== 'IMG') {
        return;
    }

    const instance = basicLightbox.create(
        `
    <div class="modal">
        <img src="${event.target.dataset.source}" width="900" height="700" alt="${event.target.alt}">
    </div>
    
`,
        {
            onShow: () => body.addEventListener('keyup', escapeClose),
            onClose: () => body.removeEventListener('keyup', escapeClose),
        }
    );

    instance.show();
    currentInstance = instance;
}

function escapeClose(event) {
    if (event.code === 'Escape') {
        currentInstance.close();
    }
}
