const seedrandom = require('seedrandom');

const getRandom = (seed) => {
  return seedrandom(seed)();
}

const randomBetween = (min, max) => {
  return Math.floor(getRandom() * (max - min + 1) + min)
};

module.exports = {
  randomBetween,
}