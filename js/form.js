import {sendData} from './api.js';
import {clearList} from './filter-form.js';
import {clearFilePreview} from "./preview.js";

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_VALUE = 0;
const MAX_PRICE_VALUE = 1000000;
const MAX_ROOM_NUMBER = 3;
const HOUSING_TYPES = [
  {
    name: 'Бунгало',
    code: 'bungalow',
    price: 0,
  },
  {
    name: 'Квартира',
    code: 'flat',
    price: 1000,
  },
  {
    name: 'Отель',
    code: 'hotel',
    price: 3000,
  },
  {
    name: 'Дом',
    code: 'house',
    price: 5000,
  },
  {
    name: 'Дворец',
    code: 'palace',
    price: 10000,
  },
];
const BASE_ADDRESS = {
  name: 'Токио',
  lat: 35.6895,
  lng: 139.69171,
};

const formElement = document.querySelector('.ad-form');
const filterElement = document.querySelector('.map__filters');
const formSelectList = formElement.querySelectorAll('select');
const formFieldsetList = formElement.querySelectorAll('fieldset');
const filterFieldsetList = formElement.querySelectorAll('fieldset');
const titleInputElement = formElement.querySelector('#title');
const priceInputElement = formElement.querySelector('#price');
const roomNumberSelectElement = formElement.querySelector('#room_number');
const capacitySelectElement = formElement.querySelector('#capacity');
const capacitySelectOptionList = capacitySelectElement.querySelectorAll('option');
const typeSelectElement = formElement.querySelector('#type');
const timeinSelectElement = formElement.querySelector('#timein');
const timeoutSelectElement = formElement.querySelector('#timeout');
const addressInputElement = formElement.querySelector('#address');
const resetButtonElement = formElement.querySelector('.ad-form__reset');

const setFormActive = () => {
  formElement.classList.remove('ad-form--disabled');
  filterElement.classList.remove('ad-form--disabled');
  formSelectList.forEach((formSelectListItem) => {
    formSelectListItem.disabled = false;
  });
  formFieldsetList.forEach((formFieldsetListItem) => {
    formFieldsetListItem.disabled = false;
  });
  filterFieldsetList.forEach((filterFieldsetListItem) => {
    filterFieldsetListItem.disabled = false;
  });
};

const setFormDisable = () => {
  formElement.classList.add('ad-form--disabled');
  filterElement.classList.add('ad-form--disabled');
  formSelectList.forEach((formSelectListItem) => {
    formSelectListItem.disabled = true;
  });
  formFieldsetList.forEach((formFieldsetListItem) => {
    formFieldsetListItem.disabled = true;
  });
  filterFieldsetList.forEach((filterFieldsetListItem) => {
    filterFieldsetListItem.disabled = true;
  });
};

const setAddress = (coords) => {
  addressInputElement.value = coords;
};

const setFilteredCapacity = (roomNumber) => {
  capacitySelectOptionList.forEach((capacitySelectOptionListItem) => {
    if (roomNumber <= MAX_ROOM_NUMBER) {
      capacitySelectOptionListItem.disabled = !(capacitySelectOptionListItem.value <= roomNumber && capacitySelectOptionListItem.value !== '0');
    } else {
      capacitySelectOptionListItem.disabled = capacitySelectOptionListItem.value !== '0';
    }
  });
  const enableOptionElement = capacitySelectElement.querySelector('option:not(:disabled)');
  capacitySelectElement.value = enableOptionElement.value;
};

const resetForm = () => {
  formElement.reset();
  filterElement.reset();
  clearFilePreview();
  clearList();
  setAddress(`${BASE_ADDRESS.lat}, ${BASE_ADDRESS.lng}`);
};

titleInputElement.addEventListener('input', () => {
  const  currentValueLength = titleInputElement.value.length;
  if (currentValueLength < MIN_TITLE_LENGTH) {
    titleInputElement.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - currentValueLength } симв.`);
  } else if (currentValueLength > MAX_TITLE_LENGTH) {
    titleInputElement.setCustomValidity(`Удалите лишние ${  currentValueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleInputElement.setCustomValidity('');
  }
  titleInputElement.reportValidity();
});

priceInputElement.addEventListener('input', () => {
  const  currentValue = priceInputElement.value;
  if (currentValue < MIN_PRICE_VALUE) {
    priceInputElement.setCustomValidity('Недопустимое значение стоимости');
  } else if (currentValue > MAX_PRICE_VALUE) {
    priceInputElement.setCustomValidity(`Стоимость не должна превышать ${  MAX_PRICE_VALUE }`);
  } else {
    priceInputElement.setCustomValidity('');
  }
  priceInputElement.reportValidity();
});

roomNumberSelectElement.addEventListener('change', () => {
  const  currentValue = roomNumberSelectElement.value;
  setFilteredCapacity(currentValue);
});

typeSelectElement.addEventListener('change', () => {
  const currentValue = typeSelectElement.value;
  const minPriceValue = HOUSING_TYPES.find((type) => type.code === currentValue).price;
  priceInputElement.placeholder = minPriceValue;
  priceInputElement.min = minPriceValue;
});

timeinSelectElement.addEventListener('change', () => {
  timeoutSelectElement.value = timeinSelectElement.value;
});

timeoutSelectElement.addEventListener('change', () => {
  timeinSelectElement.value = timeoutSelectElement.value;
});

const setClearForm = (cb) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(resetForm, formData);
    cb();
  });

  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    cb();
  });
};

setFormDisable();

export {setFormActive, setAddress, setClearForm};
