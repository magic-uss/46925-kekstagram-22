const bigPicture = document.querySelector('.big-picture');
const bigImage = document.querySelector('.big-picture__big-img');
const bigLikes = document.querySelector('.likes-count');
const bigComments = document.querySelector('.comments-count');

const createBigPicture = (url, likes, comments) => {
  bigImage.src = url;
  bigLikes.textContent = likes;
  bigComments.textContent = comments;

  return bigPicture;
}

export {bigPicture, createBigPicture};
