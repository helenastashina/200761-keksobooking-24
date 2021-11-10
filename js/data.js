import {getRandomArrayElement, getRandomInteger, getRandomFloat, getRandomArrayUniqueElement} from './util.js';

const MASS_LENGTH = 10;
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomPhoto = () => getRandomArrayElement(PHOTOS);

const createAuthor = () => {
  let randomAuthorIndex = '0';
  randomAuthorIndex = (randomAuthorIndex + getRandomInteger(1, 10)).slice(-2);
  return {
    avatar: `img/avatars/user${randomAuthorIndex}.png`,
  };
};

const createOffer = () => {
  const location = {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  };
  return {
    title: 'Предложение недели',
    address: `${location.lat}, ${location.lng}`,
    price: getRandomInteger(5000, 20000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInteger(1, 5),
    guests: getRandomInteger(1, 10),
    checkin: getRandomArrayElement(CHECKIN_TIMES),
    checkout: getRandomArrayElement(CHECKOUT_TIMES),
    features: getRandomArrayUniqueElement(FEATURES),
    description: 'Со всеми удобствами',
    photos: Array.from({length: getRandomInteger(1, 10)}, getRandomPhoto),
    author: createAuthor(),
  };
};

const offersList = Array.from({length: MASS_LENGTH}, createOffer);

export {offersList};
