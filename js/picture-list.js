import {createPhotos} from './data.js';
import {bigPicture, createBigPicture} from './big-picture.js';
import {isEscEvent} from './util.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictureImage = pictureTemplate.querySelector('.picture__img');
const pictureLikes = pictureTemplate.querySelector('.picture__likes');
const pictureComments = pictureTemplate.querySelector('.picture__comments');

const bigPictureClose = document.querySelector('.big-picture__cancel');

const photosList = createPhotos();

const pictureListFragment = document.createDocumentFragment();

photosList.forEach(({url, likes, comments}) => {
  pictureImage.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

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

    const bigPictureImage = picture.querySelector('.picture__img').src;
    const bigPictureLikes = picture.querySelector('.picture__likes').textContent;
    const bigPictureComments = picture.querySelector('.picture__comments').textContent;
    createBigPicture(bigPictureImage, bigPictureLikes, bigPictureComments);

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
};

for (let i = 0; i <= pictures.length - 1; i++) {
  openBigPicture(pictures[i]);
}

const bigPictureList = document.querySelector('.social__comments');

const bigPictureElementTemplate = '<li class="social__comment"><img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p></li>';

for (let i = 0; i < photosList[0].comments.length; i++) {
  bigPictureList.insertAdjacentHTML('beforeend', bigPictureElementTemplate);
}

const bigPictureElementsList = bigPictureList.children;
const bigPictureElement = document.querySelector('.social__comment');
const bigPictureImages = document.querySelectorAll('.social__picture');
const bigPictureTexts = document.querySelectorAll('.social__text');

const createComment = (image, text, comment) => {
  image.src = comment.avatar;
  image.alt = comment.name;
  text.textContent = comment.message;

  return bigPictureElement;
};

for (let j = 0; j < bigPictureElementsList.length; j++) {
  createComment(bigPictureImages[j], bigPictureTexts[j], photosList[0].comments[j]);
}
