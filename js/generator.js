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

const similarCardTemplateElement = document.querySelector('#card').content.querySelector('.popup');

const renderOfferCard = (offerData) => {
  const cardElement = similarCardTemplateElement.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offerData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = `${offerData.location.lat}, ${offerData.location.lng}`;
  cardElement.querySelector('.popup__text--price').textContent = `${offerData.offer.price} ₽/ночь`;
  if (offerData.offer.type) {
    const cardOfferType =  OFFER_TYPE.find((offerType) => offerType.type === offerData.offer.type);
    cardElement.querySelector('.popup__type').textContent = cardOfferType.name;
  }
  cardElement.querySelector('.popup__text--capacity').textContent = `${offerData.offer.rooms} комнаты для ${offerData.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offerData.offer.checkin}, выезд до ${offerData.offer.checkout}`;

  if (offerData.offer.features && offerData.offer.features.length > 0) {
    const featuresContainerElement = cardElement.querySelector('.popup__features');
    const featuresList = featuresContainerElement.querySelectorAll('.popup__feature');
    const modifiers = offerData.offer.features.map((feature) => `popup__feature--${  feature}`);

    featuresList.forEach((featuresListItem) => {
      const modifier = featuresListItem.classList[1];

      if (!modifiers.includes(modifier)) {
        featuresListItem.remove();
      }
    });
  }

  if (offerData.offer.description && offerData.offer.description.length > 0) {
    cardElement.querySelector('.popup__description').textContent = offerData.offer.description;
  }

  const photosContainerElement = cardElement.querySelector('.popup__photos');
  const photosTemplateElement = photosContainerElement.querySelector('.popup__photo');

  if (offerData.offer.photos && offerData.offer.photos.length > 0) {
    photosContainerElement.innerText = '';
    offerData.offer.photos.forEach((photo) => {
      const photosElement = photosTemplateElement.cloneNode(true);
      photosElement.src = photo;
      photosContainerElement.appendChild(photosElement);
    });
  } else {
    photosContainerElement.innerText = '';
  }

  cardElement.querySelector('.popup__avatar').src = offerData.author.avatar;

  return cardElement;
};

export {renderOfferCard};
