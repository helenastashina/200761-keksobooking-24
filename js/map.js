import {setFormActive, setAddress} from './form.js';
import {getData} from './api.js';
import {renderOfferCard} from './generator.js';

const BASE_ADDRESS = {
  name: 'Токио',
  lat: 35.6895,
  lng: 139.69171,
};

const map = L.map('map-canvas')
  .on('load', () => {
    setFormActive();
    setAddress(`${BASE_ADDRESS.lat}, ${BASE_ADDRESS.lng}`);
  })
  .setView({
    lat: BASE_ADDRESS.lat,
    lng: BASE_ADDRESS.lng,
  }, 12);

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

getData((offers) => {
  offers.forEach((offer) => {
    createMarker(offer);
  });
  //renderSimilarList(wizards.slice(0, SIMILAR_WIZARD_COUNT));
});

mainPinMarker.on('moveend', (evt) => {
  const currentAddress = evt.target.getLatLng();
  setAddress(`${currentAddress.lat.toFixed(5)}, ${currentAddress.lng.toFixed(5)}`);
});
