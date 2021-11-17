import './form.js';
import {debounce} from './utils/debounce.js';
import {renderOfferPin, resetMap} from './map.js';
import {setTypeFilter, setPriceFilter, setRoomsFilter, setGuestsFilter, setFeaturesFilter} from './filter-form.js';
import {getData} from './api.js';
import {setClearForm} from './form.js';

getData((offers) => {
  renderOfferPin(offers);
  setTypeFilter(
    debounce(
      () => renderOfferPin(offers),
    ));
  setPriceFilter(
    debounce(
      () => renderOfferPin(offers),
    ));
  setRoomsFilter(
    debounce(
      () => renderOfferPin(offers),
    ));
  setGuestsFilter(
    debounce(
      () => renderOfferPin(offers),
    ));

  setFeaturesFilter(
    debounce(
      () => renderOfferPin(offers),
    ));

  setClearForm(() => resetMap(offers));
});
