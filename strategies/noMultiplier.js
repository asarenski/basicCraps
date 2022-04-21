const startingBets = {
  passLine: 15,
}

const getBetFromProgressionCount = n => {
  if (n === 1 || n === 2) {
    return startingBets.passLine;
  }

  const multiplier = 1;
  let nextProgression = startingBets.passLine;
  for (let i=3; i<=n; i++) {
    nextProgression *= multiplier;
  }

  return nextProgression;
}

module.exports = {
  name: 'no progressive multiplier',
  getBetFromProgressionCount,
  oddsFactor: 1,
};