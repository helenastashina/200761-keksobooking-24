const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_VALUE = 0;
const MAX_PRICE_VALUE = 1000000;
const MAX_ROOM_NUMBER = 3;

const formElement = document.querySelector('.ad-form');
const filterElement = document.querySelector('.map__filters');
const formSelectList = formElement.querySelectorAll('select');
const formFieldsetList = formElement.querySelectorAll('fieldset');
const filterFieldsetList = formElement.querySelectorAll('fieldset');
const titleInputElement = document.querySelector('#title');
const priceInputElement = document.querySelector('#price');
const roomNumberSelectElement = document.querySelector('#room_number');
const capacitySelectElement = document.querySelector('#capacity');
const capacitySelectOptionList = capacitySelectElement.querySelectorAll('option');

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

setFormDisable();
setFormActive();

