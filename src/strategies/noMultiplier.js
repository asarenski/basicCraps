const startingBets = {
  passLine: 15,
}

const getBetFromProgressionCount = () => {
  return startingBets.passLine;
}

module.exports = {
  name: 'no progressive multiplier',
  getBetFromProgressionCount,
  oddsFactor: 1,
};