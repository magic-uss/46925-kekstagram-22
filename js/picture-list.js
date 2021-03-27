import {bigPicture, createBigPicture, createBigComment} from './create-big-picture.js';
import {isEscEvent, getRandomInt} from './util.js';
import {page} from './nodes.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictureImage = pictureTemplate.querySelector('.picture__img');
const pictureLikes = pictureTemplate.querySelector('.picture__likes');
const pictureComments = pictureTemplate.querySelector('.picture__comments');
const bigPictureList = document.querySelector('.social__comments');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
const filterButtons = document.querySelectorAll('.img-filters__button');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filtersForm = document.querySelector('.img-filters__form');

let pictures = [];
const RANDOM_ARRAY_LENGTH = 10;
let photosCount = 0;
const MAX_COMMENT = 5;

const createPhotosArray = (photos) => {
  return pictures = photos;
}

const createPhotos = (photos) => {

  if (photosCount > 0) {
    clearPhotosList();
  }
  photosCount = photos.length;
  const pictureListFragment = document.createDocumentFragment();

  photos.forEach(({id, url, likes, comments}) => {
    pictureImage.src = url;
    pictureLikes.textContent = likes;
    pictureComments.textContent = comments.length;
    pictureImage.setAttribute('data-id', id);

    pictureListFragment.appendChild(picture.cloneNode(true));
  })

  pictureList.appendChild(pictureListFragment);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}

const clearPhotosList = () => {
  for (let i = 0; i < photosCount; i++) {
    pictureList.removeChild(pictureList.querySelector('.picture'));
  }
}

const filterSwitch = (cb) => {
  filtersForm.addEventListener('click', (evt) => {
    cb(evt.target);
  })
}

const renderPhotos = (filter, photos) => {
  if (filter === filterDefault) {
    for (let i = 0; i <= filterButtons.length - 1; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    filterDefault.classList.add('img-filters__button--active');

    createPhotos(photos);
  }

  if (filter === filterRandom) {
    for (let i = 0; i <= filterButtons.length - 1; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    filterRandom.classList.add('img-filters__button--active');

    let randomPhotosArray =[];
    let randomArray =[];

    while (randomArray.length < photos.length) {
      let random = getRandomInt(0, photos.length - 1);

      if (randomArray.indexOf(random) === -1) {
        randomArray.push(random);
      }
    }

    for (let i = 0; i < RANDOM_ARRAY_LENGTH; i++) {
      randomPhotosArray.push(photos[randomArray[i]]);
    }

    createPhotos(randomPhotosArray);

    return randomPhotosArray;
  }

  if (filter === filterDiscussed) {
    for (let i = 0; i <= filterButtons.length - 1; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
    filterDiscussed.classList.add('img-filters__button--active');

    const photosDiscussedArray = photos.slice().sort((photo1, photo2) => photo1.comments.length < photo2.comments.length ? 1 : -1);

    createPhotos(photosDiscussedArray);
    return photosDiscussedArray;
  }
}

const onBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');

  bigPictureList.innerHTML = '';

  bigPictureClose.removeEventListener('click', () => {
    closeBigPicture();
  })

  document.removeEventListener('keydown', onBigPictureEscKeydown);

  page.classList.remove('modal-open');
}

pictureList.addEventListener('click', (evt) => {
  if (evt.target.nodeName === 'IMG') {
    bigPicture.classList.remove('hidden');

    bigPictureClose.addEventListener('click', () => {
      closeBigPicture();
    })

    document.addEventListener('keydown', onBigPictureEscKeydown);

    const pictureId = evt.target.getAttribute('data-id');

    const bigPictureImage = pictures[pictureId].url;
    const bigPictureLikes = pictures[pictureId].likes;
    let bigPictureComments = pictures[pictureId].comments;
    const bigPictureDescription = pictures[pictureId].description;
    createBigPicture(bigPictureImage, bigPictureLikes, bigPictureComments, bigPictureDescription);
    let commentsLength = bigPictureComments.length;

    const bigPictureElementTemplate = '<li class="social__comment"><img class="social__image" src="" alt="" width="35" height="35"><p class="social__text"></p></li>';
    let commentQuantity = MAX_COMMENT;

    const renderComments = () => {
      if (commentsLength < MAX_COMMENT) {
        commentsLoader.classList.add('hidden');
        commentQuantity = commentsLength;
      }

      if (commentsLength > MAX_COMMENT) {
        commentsLoader.classList.remove('hidden');
      }

      for (let i = 0; i < commentQuantity; i++) {
        bigPictureList.insertAdjacentHTML('beforeend', bigPictureElementTemplate);
      }

      const bigPictureElementsList = bigPictureList.children;
      const bigPictureImages = bigPictureList.querySelectorAll('.social__image');
      const bigPictureTexts = bigPictureList.querySelectorAll('.social__text');

      for (let j = 0; j < bigPictureElementsList.length; j++) {
        createBigComment(bigPictureImages[j], bigPictureTexts[j], pictures[pictureId].comments[j]);
      }
    }

    renderComments();

    commentsLoader.addEventListener('click', () => {
      commentsLength = commentsLength - MAX_COMMENT;
      renderComments();
      return commentsLength;
    })

    document.querySelector('.social__comment-count').classList.add('hidden');
    page.classList.add('modal-open');
  }
})

export {filterSwitch, renderPhotos, createPhotos, pictures, createPhotosArray};
