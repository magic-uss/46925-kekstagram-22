import {createPhotos} from './data.js';
import {bigPicture, createBigPicture, createBigComment} from './big-picture.js';
import {isEscEvent} from './util.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictureImage = pictureTemplate.querySelector('.picture__img');
const pictureLikes = pictureTemplate.querySelector('.picture__likes');
const pictureComments = pictureTemplate.querySelector('.picture__comments');

const bigPictureList = document.querySelector('.social__comments');
const bigPictureClose = document.querySelector('.big-picture__cancel');

const photosList = createPhotos();

const pictureListFragment = document.createDocumentFragment();

photosList.forEach(({id, url, likes, comments}) => {
  pictureImage.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;
  picture.setAttribute('data-id', id);

  pictureListFragment.appendChild(picture.cloneNode(true));
});

pictureList.appendChild(pictureListFragment);

const pictures = pictureList.querySelectorAll('.picture');

const onBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');

  bigPictureList.innerHTML = '';

  bigPictureClose.removeEventListener('click', () => {
    closeBigPicture();
  });

  document.removeEventListener('keydown', onBigPictureEscKeydown);

  document.querySelector('body').classList.remove('modal-open');
}

const openBigPicture = (picture) => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();

    bigPicture.classList.remove('hidden');

    bigPictureClose.addEventListener('click', () => {
      closeBigPicture();
    });

    document.addEventListener('keydown', onBigPictureEscKeydown);

    const pictureId = evt.currentTarget.getAttribute('data-id');

    const bigPictureImage = photosList[pictureId - 1].url;
    const bigPictureLikes = photosList[pictureId - 1].likes;
    const bigPictureComments = photosList[pictureId - 1].comments.length;
    createBigPicture(bigPictureImage, bigPictureLikes, bigPictureComments);

    const bigPictureElementTemplate = '<li class="social__comment"><img class="social__image" src="" alt="" width="35" height="35"><p class="social__text"></p></li>';

    for (let i = 0; i < photosList[pictureId - 1].comments.length; i++) {
      bigPictureList.insertAdjacentHTML('beforeend', bigPictureElementTemplate);
    }

    const bigPictureElementsList = bigPictureList.children;
    const bigPictureImages = bigPictureList.querySelectorAll('.social__image');
    const bigPictureTexts = bigPictureList.querySelectorAll('.social__text');

    for (let j = 0; j < bigPictureElementsList.length; j++) {
      createBigComment(bigPictureImages[j], bigPictureTexts[j], photosList[pictureId - 1].comments[j]);
    }

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
};

for (let i = 0; i <= pictures.length - 1; i++) {
  openBigPicture(pictures[i]);
}
