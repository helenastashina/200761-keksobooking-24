const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {return;}
  const currentMin = Math.min(min, max);
  const currentMax = Math.max(min, max);
  const rand = currentMin + Math.random() * (currentMax + 1 - currentMin);
  return Math.floor(rand);
};

const getRandomFloat = (min, max, decimalPlaces)  => {
  if (min < 0 || max < 0) {return;}
  const currentMin = Math.min(min, max);
  const currentMax = Math.max(min, max);
  const rand = Math.random() < 0.5 ? ((1 - Math.random()) * (currentMax - currentMin) + currentMin) : (Math.random() * (currentMax - currentMin) + currentMin);
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(rand*power) / power;
};

getRandomFloat(2.5,4.2,5);
getRandomInteger(5, 13);
