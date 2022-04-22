const {bet, roll, cleanup} = require('./gameLogic');
const {
  coverInitial,
  diceDoctorProgressive,
  noMultiplier,
} = require('./strategies');
const Player = require('./player');
const GameState = require('./gameState');
const {get: getBetState} = require('./betState');

const config = {
  startingBankRoll: 400,
  playerSessions: 10000,
};

const main = strategy => {
  const {startingBankRoll} = config;
  const getNewGame = () => {
    const player = new Player({
      strategy,
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
  let turnsSum = 0;
  let maxBankRollSum = 0;
  let absoluteMax = 0;

  const {playerSessions} = config;
  for (let i=0; i<playerSessions; i++) {
    const args = getNewGame();
    try {
      while(true) {
        turn(args);
        if (turnCount > MAX_TURN_COUNT) {
          throw new Error('lasted longer than max turn count');
        }
      }
    } catch(e) {
      const {PLAYER_IS_BROKE_MESSAGE} = Player;
      if (e.message !== PLAYER_IS_BROKE_MESSAGE) {
        throw new Error(e);
      }

      turnsSum += turnCount;
      maxBankRollSum += args.player.maxBankRoll;
      absoluteMax = Math.max(args.player.maxBankRoll, absoluteMax);
      sessions++;

      turnCount = 1;
    }
  }

  console.log(`strategy: ${getNewGame().player.strategy.name}`);
  console.log(`starting bank roll: ${startingBankRoll}`);
  console.log(`total sessions: ${sessions}`);
  console.log(`average turns lived: ${turnsSum/sessions}`);
  console.log(`average max bank roll: ${Math.round(maxBankRollSum/sessions)}`);
  console.log(`abolute max bank roll: ${Math.round(absoluteMax)}`);
  console.log('');
};

const strategies = [
  coverInitial,
  diceDoctorProgressive,
  noMultiplier,
];

strategies.forEach(strategy => {
  main(strategy);
});
