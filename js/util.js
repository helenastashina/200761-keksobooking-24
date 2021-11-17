const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {return;}
  const currentMin = Math.min(min, max);
  const currentMax = Math.max(min, max);
  const rand = currentMin + Math.random() * (currentMax + 1 - currentMin);
  return Math.floor(rand);
};

const getRandomFloat = (min, max, decimalPlaces)  => {
  if (min < 0 || max < 0) {return;}
  const currentMin = Math.min(min, max);
  const currentMax = Math.max(min, max);
  const rand = Math.random() < 0.5 ? ((1 - Math.random()) * (currentMax - currentMin) + currentMin) : (Math.random() * (currentMax - currentMin) + currentMin);
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(rand*power) / power;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayUniqueElement = (elements) => {
  const randomArrayLength = getRandomInteger(1, elements.length);
  const randomArrayUniqueElement = [];

  while(randomArrayUniqueElement.length < randomArrayLength){
    const randomElement = elements[getRandomInteger(0, elements.length - 1)];
    if (randomArrayUniqueElement.indexOf(randomElement) > -1) {
      continue;
    }
    randomArrayUniqueElement.push(randomElement);
  }

  return randomArrayUniqueElement;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

let alertContainer;

function removeAlert() {
  alertContainer.remove();
  document.removeEventListener('keydown', onAlertEscKeydown);
}

function onAlertEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeAlert();
  }
}

const showAlert = (alertType) => {
  const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorDataTemplate = '<p class="error__message">Не удалось загрузить данные</p>';

  switch (alertType) {
    case 'error': alertContainer = errorTemplateElement.cloneNode(true);
      break;
    case 'success': alertContainer = successTemplateElement.cloneNode(true);
      break;
    case 'errorData': alertContainer = document.createElement('div');
      alertContainer.innerHTML = errorDataTemplate;
      alertContainer.classList.add('error');
      break;
    default: break;
  }

  alertContainer.addEventListener('click', () => {
    removeAlert();
  });

  document.addEventListener('keydown', onAlertEscKeydown);

  document.body.append(alertContainer);
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArrayUniqueElement, showAlert};
