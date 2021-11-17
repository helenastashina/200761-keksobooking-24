import './form.js';
import {debounce} from './utils/debounce.js';
import {renderOfferPin, resetMap} from './map.js';
import {setTypeFilter, setPriceFilter, setRoomsFilter, setGuestsFilter, setFeaturesFilter} from './filter-form.js';
import {getData} from './api.js';
import {setClearForm} from './form.js';

const RERENDER_DELAY = 500;

getData((offers) => {
  renderOfferPin(offers);
  setTypeFilter(
    debounce(
      () => renderOfferPin(offers),
      RERENDER_DELAY,
    ));
  setPriceFilter(
    debounce(
      () => renderOfferPin(offers),
      RERENDER_DELAY,
    ));
  setRoomsFilter(
    debounce(
      () => renderOfferPin(offers),
      RERENDER_DELAY,
    ));
  setGuestsFilter(
    debounce(
      () => renderOfferPin(offers),
      RERENDER_DELAY,
    ));

  setFeaturesFilter(
    debounce(
      () => renderOfferPin(offers),
      RERENDER_DELAY,
    ));

  setClearForm(() => resetMap(offers));
});
