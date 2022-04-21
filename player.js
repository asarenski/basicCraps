const {PASS_LINE, ODDS} = require('./betState');
const {COMEOUT} = require('./gameState');

const PROGRESSION_COUNT_START = 1;

class Player {
  constructor({strategy, bankRoll = 400}) {
    this.progressionCount = PROGRESSION_COUNT_START;
    this.strategy = strategy;
    this.bankRoll = bankRoll;
    this.win = undefined;
    this.maxBankRoll = bankRoll;
  }

  _basebet(amount, betStateType, betState) {
    this.bankRoll -= amount;

    betState[betStateType] += amount;

    return betState;
  }

  betComeout(amount, betState) {
    this._basebet(amount, PASS_LINE, betState);
  }

  betOdds(amount, betState) {
    this._basebet(amount, ODDS, betState);
  }

  bet({betState, gameState}) {
    this.maxBankRoll = Math.max(this.bankRoll, this.maxBankRoll);

    if (gameState.isComeout()) {
      const amount = this.strategy.getBetFromProgressionCount(this.progressionCount);

      if (amount > this.bankRoll) {
        throw new Error('player is broke!');
      }

      this.betComeout(amount, betState);
    } else if (this.strategy.oddsFactor && !betState.hasOdds()) {
      let amount = this.strategy.getBetFromProgressionCount(this.progressionCount);
      amount = amount * this.strategy.oddsFactor;

      if (amount < this.bankRoll) {
        this.betOdds(amount, betState);
      }
    }
  }

  resetProgression() {
    this.progressionCount = PROGRESSION_COUNT_START;
  }
}

module.exports = Player;