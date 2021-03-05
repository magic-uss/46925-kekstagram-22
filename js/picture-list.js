import {createPhotos} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');
const pictureImage = pictureTemplate.querySelector('.picture__img');
const pictureLikes = pictureTemplate.querySelector('.picture__likes');
const pictureComments = pictureTemplate.querySelector('.picture__comments');

const photosList = createPhotos();

const pictureListFragment = document.createDocumentFragment();

photosList.forEach(({url, likes, comments}) => {
  pictureImage.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  pictureListFragment.appendChild(picture.cloneNode(true));
});

pictureList.appendChild(pictureListFragment);
