const {PASS_LINE, ODDS} = require('./betState');

const PROGRESSION_COUNT_START = 1;

class Player {
  static PLAYER_IS_BROKE_MESSAGE = 'player is broke!';

  constructor({strategy, bankRoll = 400}) {
    this.progressionCount = PROGRESSION_COUNT_START;
    this.strategy = strategy;
    this.bankRoll = bankRoll;
    this.win = undefined;
    this.maxBankRoll = bankRoll;
  }

  _baseBet(amount, betStateType, betState) {
    this.bankRoll -= amount;
    betState[betStateType] += amount;
    return betState;
  }

  betComeout(amount, betState) {
    this._baseBet(amount, PASS_LINE, betState);
  }

  betOdds(amount, betState) {
    this._baseBet(amount, ODDS, betState);
  }

  bet({betState, gameState}) {
    this.maxBankRoll = Math.max(this.bankRoll, this.maxBankRoll);

    let amount;

    if (gameState.isComeout()) {
      amount = this.strategy.getBetFromProgressionCount(this.progressionCount);

      if (this.strategy.parlayNaturals && this.winOnNatural) {
        amount *= 2;
        this.winOnNatural = false;
      }

      if (amount > this.bankRoll) {
        throw new Error(Player.PLAYER_IS_BROKE_MESSAGE);
      }

      this.betComeout(amount, betState);
    } else if (this.strategy.oddsFactor && !betState.hasOdds()) {
      amount = this.strategy.getBetFromProgressionCount(this.progressionCount);
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