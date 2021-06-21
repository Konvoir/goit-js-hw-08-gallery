const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },

  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
gallery: document.querySelector('.js-gallery'),
modal: document.querySelector('.js-lightbox'),
modalImages: document.querySelector('.lightbox__image'),
overlay: document.querySelector('.lightbox__overlay'),
closeModalBtn: document.querySelector('button[data-action="close-lightbox"]')
}
// Создание и рендер разметки по массиву данных
const cardsMarkup = createCardsMarkup(galleryItems);

function createCardsMarkup (images) {
return images.map(({preview, original, description}) => {
  return `<li class="gallery__item">
<a class="gallery__link"
  href="${original}" >
  <img class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}" />
</a>
</li>`})
  .join('');
  };

refs.gallery.insertAdjacentHTML('beforeend', cardsMarkup);

// Реализация делегирования на галерее 

refs.gallery.addEventListener('click', onGalleryClick);

function onGalleryClick (evt) {
evt.preventDefault();
if (evt.target.nodeName !== 'IMG') {
   return;
}

const imagesRef = evt.target;
const largeImagesSource = imagesRef.dataset.source;
const largeImagesAlt = imagesRef.alt

// Подмена значения атрибутов
setLargeImageSrc(largeImagesSource);  
setLargeImageAlt(largeImagesAlt);


// Открытие модального окна 
refs.modal.classList.add('is-open');

};

function setLargeImageSrc(url) {
refs.modalImages.src = url;
};

function setLargeImageAlt(alt) {
refs.modalImages.alt = alt;};


// <!-- Закрытие модального окна по
//  клику на кнопку button[data-action="close-lightbox"]. -->

function closeModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImages.src = "";
  refs.modalImages.alt = "";
}

refs.closeModalBtn.addEventListener('click', closeModal);
refs.overlay.addEventListener('click', closeModal);


document.addEventListener('keydown', (event) => {
 if (event.code === 'Escape' && refs.modal.classList.contains('is-open') === true) {
    closeModal(event);
 }
})
