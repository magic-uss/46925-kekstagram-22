const bigPicture = document.querySelector('.big-picture');
const bigImage = document.querySelector('.big-picture__big-img');
const bigLikes = document.querySelector('.likes-count');
const bigComments = document.querySelector('.comments-count');
const bigDescription = document.querySelector('.social__caption');

const createBigPicture = (url, likes, comments, description) => {
  bigImage.src = url;
  bigLikes.textContent = likes;
  bigComments.textContent = comments;
  bigDescription.textContent = description;

  return bigPicture;
}

const createBigComment = (image, text, comment) => {
  image.src = comment.avatar;
  image.alt = comment.name;
  text.textContent = comment.message;

  return image, text;
};

export {bigPicture, createBigPicture, createBigComment};
