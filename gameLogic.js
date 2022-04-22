const seedrandom = require('seedrandom');
const oddsPayouts = require('./oddsPayouts');
const {PASS_LINE, ODDS} = require('./betState');

function randomBetween(min, max) {
  return Math.floor(seedrandom()() * (max - min) + min);
}

const getDiceRoll = () => {
  const lower = 1;
  const upper = 6;
  const first = randomBetween(lower, upper);
  const second = randomBetween(lower, upper);

  return first+second;
};

const crapsRolls = [2,3,12];
const naturalRolls = [7,11];

const bet = ({
  player,
  betState,
  gameState,
}) => {
  player.bet({betState, gameState});
};

const roll = ({
  gameState,
  player,
}) => {
  const nextRoll = getDiceRoll();

  // console.log(`rolled ${nextRoll} on ${gameState.state}`)

  if (gameState.isComeout()) {
    if (naturalRolls.includes(nextRoll)) {
      player.win = true;
      player.winOnNatural = true;
    } else if (crapsRolls.includes(nextRoll)) {
      player.win = false;
    } else {
      gameState.setPoint(nextRoll);
    }
  } else {
    if (nextRoll === 7) {
      player.win = false;
    } else if (nextRoll === gameState.point) {
      player.win = true;
    }
  }
};

const cleanup = ({
  gameState,
  betState,
  player,
}) => {
  if (player.win === true || player.win === false) {
    if (player.win) {
      let total = 0;
      total += betState[PASS_LINE] * 2;

      if (!gameState.isComeout()) {
        total += betState[ODDS] * oddsPayouts[gameState.point];
      }

      if (isNaN(total)) {
        throw new Error('total was NaN');
      }
  
      player.bankRoll += total;

      // if they won the point increment progression
      if (!gameState.isComeout()) {
        player.progressionCount += 1;
      }
    } else {
      player.resetProgression();
    }
    
    player.win = undefined;
    gameState.removePoint();
    betState.reset();
  }
};

module.exports = {
  bet,
  roll,
  cleanup,
}