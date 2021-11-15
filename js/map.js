import {setFormActive, setAddress} from './form.js';
import {offersList} from './data.js';
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
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
  const currentCoords = point.address.split(', ');
  const offerPinMarker = L.marker(
    {
      lat: currentCoords[0],
      lng: currentCoords[1],
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

offersList.forEach((offer) => {
  createMarker(offer);
});

mainPinMarker.on('moveend', (evt) => {
  const currentAddress = evt.target.getLatLng();
  setAddress(`${currentAddress.lat.toFixed(5)}, ${currentAddress.lng.toFixed(5)}`);
});


