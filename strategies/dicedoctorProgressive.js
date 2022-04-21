const startingBets = {
  passLine: 15,
}

const getBetFromProgressionCount = n => {
  if (n === 1) {
    return startingBets.passLine;
  }

  const multiplier = 1.5;
  let nextProgression = startingBets.passLine;
  for (let i=3; i<=n; i++) {
    nextProgression *= multiplier;
  }

  return nextProgression;
}

module.exports = {
  name: 'dice doctors progressive',
  getBetFromProgressionCount,
  oddsFactor: 1,
};