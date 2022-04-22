const seedrandom = require('seedrandom');

const randomBetween = (min, max) => {
  return Math.floor(seedrandom()() * (max - min + 1) + min)
};

module.exports = {
  randomBetween,
}