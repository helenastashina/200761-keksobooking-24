const OFFER_TYPES = [
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

const similarCardTemplateElement = document.querySelector('#card').content.querySelector('.popup');

const renderOfferCard = (offer) => {
  const cardElement = similarCardTemplateElement.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = `${offer.location.lat}, ${offer.location.lng}`;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  if (offer.offer.type) {
    const cardOfferType =  OFFER_TYPES.find((offerType) => offerType.type === offer.offer.type);
    cardElement.querySelector('.popup__type').textContent = cardOfferType.name;
  }
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;

  if (offer.offer.features && offer.offer.features.length > 0) {
    const featuresContainerElement = cardElement.querySelector('.popup__features');
    const featuresList = featuresContainerElement.querySelectorAll('.popup__feature');
    const modifiers = offer.offer.features.map((feature) => `popup__feature--${  feature}`);

    featuresList.forEach((featuresListItem) => {
      const modifier = featuresListItem.classList[1];

      if (!modifiers.includes(modifier)) {
        featuresListItem.remove();
      }
    });
  }

  if (offer.offer.description && offer.offer.description.length > 0) {
    cardElement.querySelector('.popup__description').textContent = offer.offer.description;
  }

  const photosContainerElement = cardElement.querySelector('.popup__photos');
  const photosTemplateElement = photosContainerElement.querySelector('.popup__photo');
  const photosContainerFragment =  document.createDocumentFragment();

  photosContainerElement.innerText = '';

  if (offer.offer.photos && offer.offer.photos.length > 0) {
    photosContainerFragment.innerText = '';
    offer.offer.photos.forEach((photo) => {
      const photosElement = photosTemplateElement.cloneNode(true);
      photosElement.src = photo;
      photosContainerFragment.appendChild(photosElement);
    });
  } else {
    photosContainerFragment.innerText = '';
  }

  photosContainerElement.appendChild(photosContainerFragment);

  cardElement.querySelector('.popup__avatar').src = offer.author.avatar;

  return cardElement;
};

export {renderOfferCard};
