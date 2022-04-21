const PASS_LINE = 'passLine'
const ODDS = 'odds';

const get = () => {
  return {
    [PASS_LINE]: 0,
    [ODDS]: 0,
    reset() {
      this[PASS_LINE] = 0;
      this[ODDS] = 0;
    },
    hasOdds() {
      return this[ODDS] > 0;
    },
  };
};

module.exports = {
  get,
  PASS_LINE,
  ODDS,
};