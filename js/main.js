import './form.js';
import {debounce} from './utils/debounce.js';
import {renderOfferPin} from './map.js';
import {setTypeFilter, setPriceFilter, setRoomsFilter, setGuestsFilter, setFeaturesFilter} from './filter-form.js';
import {getData} from './api.js';

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
});
