import {offersList} from './data.js';

const OFFER_TYPE = [
  {
    type: 'flat',
    name: 'Квартира',
  },
  {
    type: 'bungalow',
    name: 'Бунгало',
  },
  {
    type: 'house',
    name: 'Дом',
  },
  {
    type: 'palace',
    name: 'Дворец',
  },
  {
    type: 'hotel',
    name: 'Отель',
  },
];

const similarListElement = document.querySelector('.map__canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

offersList.forEach((offer) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  const cardOfferType =  OFFER_TYPE.find((offerType) => offerType.type === offer.type);
  cardElement.querySelector('.popup__type').textContent = cardOfferType.name;
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = offer.features.map((feature) => `popup__feature--${  feature}`);

  featuresList.forEach((featuresListItem) => {
    const modifier = featuresListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featuresListItem.remove();
    }
  });
  cardElement.querySelector('.popup__description').textContent = offer.description;
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photosTemplate = photosContainer.querySelector('.popup__photo');
  photosContainer.innerHTML = '';
  offer.photos.forEach((photo) => {
    const photosElement = photosTemplate.cloneNode(true);
    photosElement.src = photo;
    photosContainer.appendChild(photosElement);
  });
  cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
  similarListElement.appendChild(cardElement);
});
