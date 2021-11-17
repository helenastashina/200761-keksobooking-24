import {showAlert} from './util.js';

const BASE_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const BASE_API_URL = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(BASE_DATA_URL)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert('errorData');
    });
};

const sendData = (onSuccess, body) => {
  fetch(
    BASE_API_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showAlert('success');
      } else {
        showAlert('error');
      }
    })
    .catch(() => {
      showAlert('error');
    });
};

export {getData, sendData};

