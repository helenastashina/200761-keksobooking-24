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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayUniqueElement = (elements) => {
  const randomArrayLength = getRandomInteger(1, elements.length);
  const randomArrayUniqueElement = [];

  while(randomArrayUniqueElement.length < randomArrayLength){
    const randomElement = elements[getRandomInteger(0, elements.length - 1)];
    if (randomArrayUniqueElement.indexOf(randomElement) > -1) {
      continue;
    }
    randomArrayUniqueElement.push(randomElement);
  }

  return randomArrayUniqueElement;
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArrayUniqueElement};
