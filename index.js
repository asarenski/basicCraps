const {bet, roll, cleanup} = require('./gameLogic');
const {
  coverInitial,
  diceDoctorProgressive,
  noMultiplier,
} = require('./strategies');
const Player = require('./player');
const GameState = require('./gameState');
const {get: getBetState} = require('./betState');

const startingBankRoll = 400;
const getNewGame = () => {
  const player = new Player({
    strategy: diceDoctorProgressive,
    bankRoll: startingBankRoll,
  });
  const gameState = new GameState();
  const betState = getBetState();

  return {
    player,
    gameState,
    betState,
  };
};

let turnCount = 1;
const turn = (args) => {
  bet(args);
  roll(args);
  cleanup(args);
  turnCount++;
};

const MAX_TURN_COUNT = 20000;
let sessions = 0;
let sessionsSum = 0;
let maxBankRollSum = 0;
let absoluteMax = 0;

for (let i=0; i<1000000; i++) {
  const args = getNewGame();
  try {
    while(true) {
      turn(args);
      if (turnCount > MAX_TURN_COUNT) {
        throw new Error('lasted longer than max turn count');
      }
    }
  } catch(e) {
    // console.log(e.message);
    // console.log(`player lasted ${turnCount} turns`);

    sessionsSum += turnCount;
    maxBankRollSum += args.player.maxBankRoll;
    absoluteMax = Math.max(args.player.maxBankRoll, absoluteMax);
    sessions++;

    turnCount = 1;
  }
}


console.log(`strategy: ${getNewGame().player.strategy.name}`);
console.log(`starting bank roll: ${startingBankRoll}`);
console.log(`total rounds: ${sessions}`);
console.log(`average turns lived: ${sessionsSum/sessions}`);
console.log(`average max bank roll: ${Math.round(maxBankRollSum/sessions)}`);
console.log(`abolute max bank roll: ${Math.round(absoluteMax)}`);