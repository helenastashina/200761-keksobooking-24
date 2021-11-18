import {setFormActive, setAddress} from './form.js';
import {renderOfferCard} from './generator.js';
import {checkOfferList} from './filter-form.js';

const BASE_ADDRESS = {
  name: 'Токио',
  lat: 35.6895,
  lng: 139.69171,
};

const MAX_PIN_COUNT = 10;

const BASE_MAP_ZOOM = 12;

const map = L.map('map-canvas')
  .on('load', () => {
    setFormActive();
    setAddress(`${BASE_ADDRESS.lat}, ${BASE_ADDRESS.lng}`);
  })
  .setView({
    lat: BASE_ADDRESS.lat,
    lng: BASE_ADDRESS.lng,
  }, BASE_MAP_ZOOM);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const offerPinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: BASE_ADDRESS.lat,
    lng: BASE_ADDRESS.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const offerPinMarker = L.marker(
    {
      lat: point.location.lat,
      lng: point.location.lng,
    },
    {
      icon: offerPinIcon,
    },
  );

  offerPinMarker.addTo(markerGroup)
    .bindPopup(renderOfferCard(point));
};

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainPinMarker.addTo(map);

const clearOfferPin = () => {
  markerGroup.clearLayers();
};

const renderOfferPin = (offerList) => {
  clearOfferPin();
  offerList
    .slice()
    .filter((offer) => checkOfferList(offer))
    .slice(0, MAX_PIN_COUNT)
    .forEach((offer) => {
      createMarker(offer);
    });
};

const resetMap = (offerList) => {
  clearOfferPin();
  map.setView({
    lat: BASE_ADDRESS.lat,
    lng: BASE_ADDRESS.lng,
  }, BASE_MAP_ZOOM);
  mainPinMarker.setLatLng([BASE_ADDRESS.lat, BASE_ADDRESS.lng]);
  offerList
    .slice()
    .slice(0, MAX_PIN_COUNT)
    .forEach((offer) => {
      createMarker(offer);
    });
};

mainPinMarker.on('moveend', (evt) => {
  const currentAddress = evt.target.getLatLng();
  setAddress(`${currentAddress.lat.toFixed(5)}, ${currentAddress.lng.toFixed(5)}`);
});

export {resetMap, renderOfferPin, clearOfferPin};
