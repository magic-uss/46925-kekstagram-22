const getData = (onSuccess, onError) => () => {
  return fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((uploadedPhotos) => {
      onSuccess(uploadedPhotos);
    })
    .catch(() => {
      onError();
    })
}

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    })
}

export {getData, sendData};
