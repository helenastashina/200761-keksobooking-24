const formElement = document.querySelector('.ad-form');
const filterElement = document.querySelector('.map__filters');
const formSelectList = formElement.querySelectorAll('select');
const formFieldsetList = formElement.querySelectorAll('fieldset');
const filterFieldsetList = formElement.querySelectorAll('fieldset');

const setFormActive = () => {
  formElement.classList.remove('ad-form--disabled');
  filterElement.classList.remove('ad-form--disabled');
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

setFormDisable();
setFormActive();

