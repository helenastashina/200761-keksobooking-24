const DEFAULT_VALUE = 'any';
const GUEST_COUNT_1 = 1;
const GUEST_COUNT_2 = 2;
const LOW_PRICE_VALUE = 10000;
const HIGH_PRICE_VALUE = 50000;
const filterElement = document.querySelector('.map__filters');
const typeFilterElement = filterElement.querySelector('#housing-type');
const priceFilterElement = filterElement.querySelector('#housing-price');
const roomsFilterElement = filterElement.querySelector('#housing-rooms');
const guestsFilterElement = filterElement.querySelector('#housing-guests');
const featuresFilterElementList = filterElement.querySelectorAll('.map__checkbox');

const filterList = {
  type: DEFAULT_VALUE,
  price: DEFAULT_VALUE,
  rooms: DEFAULT_VALUE,
  guests: DEFAULT_VALUE,
  features: [],
};

const clearList = () => {
  filterList.type = DEFAULT_VALUE;
  filterList.price = DEFAULT_VALUE;
  filterList.rooms = DEFAULT_VALUE;
  filterList.guests = DEFAULT_VALUE;
  filterList.features = [];
};

const setTypeFilter = (cb) => {
  typeFilterElement.addEventListener('change', (evt) => {
    filterList.type = evt.target.value;
    cb();
  });
};
const setPriceFilter = (cb) => {
  priceFilterElement.addEventListener('change', (evt) => {
    filterList.price = evt.target.value;
    cb();
  });
};

const setRoomsFilter = (cb) => {
  roomsFilterElement.addEventListener('change', (evt) => {
    filterList.rooms = evt.target.value;
    cb();
  });
};

const setGuestsFilter = (cb) => {
  guestsFilterElement.addEventListener('change', (evt) => {
    filterList.guests = evt.target.value;
    cb();
  });
};

const setFeaturesFilter = (cb) => {
  featuresFilterElementList.forEach((featuresFilterElement) => {
    featuresFilterElement.addEventListener('change', (evt) => {
      const value = evt.target.value;
      if (evt.target.checked) {
        filterList.features.push(evt.target.value);
      } else {
        const index = filterList.features.indexOf(value);
        if (index > -1) {
          filterList.features.splice(index, 1);
        }
      }
      cb();
    });
  });
};


const checkType = (currentValue, filterValue) => filterValue === DEFAULT_VALUE || currentValue === filterValue;

const checkPrice = (currentValue, filterValue) => {
  let isCorrectPrice;
  switch (filterValue) {
    case 'middle':
      isCorrectPrice = (currentValue >= LOW_PRICE_VALUE && currentValue <= HIGH_PRICE_VALUE);
      break;
    case 'low':
      isCorrectPrice = currentValue < LOW_PRICE_VALUE;
      break;
    case 'high':
      isCorrectPrice = currentValue > HIGH_PRICE_VALUE;
      break;
    default:
      isCorrectPrice = true;
      break;
  }
  return isCorrectPrice;
};

const checkRooms = (currentValue, filterValue) => filterValue === DEFAULT_VALUE || currentValue === Number(filterValue);

const checkGuests = (currentValue, filterValue) => {
  let isCorrectValue;
  switch (filterValue) {
    case '1':
      isCorrectValue = currentValue === GUEST_COUNT_1;
      break;
    case '2':
      isCorrectValue = currentValue === GUEST_COUNT_2;
      break;
    case '0':
      isCorrectValue = currentValue > GUEST_COUNT_2;
      break;
    default:
      isCorrectValue = true;
      break;
  }
  return isCorrectValue;
};

const checkFeatures = (currentValue, filterValue) => currentValue && filterValue.every((value) => currentValue.includes(value));

const checkOfferList = (offer) => checkType(offer.offer.type, filterList.type) &&
  checkPrice(offer.offer.price, filterList.price) &&
  checkRooms(offer.offer.rooms, filterList.rooms) &&
  checkGuests(offer.offer.guests, filterList.guests) &&
  checkFeatures(offer.offer.features, filterList.features);

export {clearList, checkOfferList, setTypeFilter, setPriceFilter, setRoomsFilter, setGuestsFilter, setFeaturesFilter};
