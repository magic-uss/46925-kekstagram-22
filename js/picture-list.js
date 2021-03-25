import {bigPicture, createBigPicture, createBigComment} from './big-picture.js';
import {isEscEvent} from './util.js';
import {page} from './nodes.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictureImage = pictureTemplate.querySelector('.picture__img');
const pictureLikes = pictureTemplate.querySelector('.picture__likes');
const pictureComments = pictureTemplate.querySelector('.picture__comments');

const bigPictureList = document.querySelector('.social__comments');
const bigPictureClose = document.querySelector('.big-picture__cancel');
let pictures = [];

const createPhotos = (photos) => {
  const pictureListFragment = document.createDocumentFragment();

  photos.forEach(({id, url, likes, comments}) => {
    pictureImage.src = url;
    pictureLikes.textContent = likes;
    pictureComments.textContent = comments.length;
    pictureImage.setAttribute('data-id', id);

    pictureListFragment.appendChild(picture.cloneNode(true));
  })

  pictureList.appendChild(pictureListFragment);
  pictures = photos;
  return pictures;
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
    const bigPictureComments = pictures[pictureId].comments;
    const bigPictureDescription = pictures[pictureId].description;
    createBigPicture(bigPictureImage, bigPictureLikes, bigPictureComments, bigPictureDescription);

    const bigPictureElementTemplate = '<li class="social__comment"><img class="social__image" src="" alt="" width="35" height="35"><p class="social__text"></p></li>';

    for (let i = 0; i < bigPictureComments.length; i++) {
      bigPictureList.insertAdjacentHTML('beforeend', bigPictureElementTemplate);
    }

    const bigPictureElementsList = bigPictureList.children;
    const bigPictureImages = bigPictureList.querySelectorAll('.social__image');
    const bigPictureTexts = bigPictureList.querySelectorAll('.social__text');

    for (let j = 0; j < bigPictureElementsList.length; j++) {
      createBigComment(bigPictureImages[j], bigPictureTexts[j], pictures[pictureId].comments[j]);
    }

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    page.classList.add('modal-open');
  }
})

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

export {createPhotos};
