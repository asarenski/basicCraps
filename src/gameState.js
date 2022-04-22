const COMEOUT = 'comeout';
const POINT = 'point';

class GameState {
  constructor() {
    this.point = undefined;
    this.state = COMEOUT;
  }

  setPoint(nextPoint) {
    this.point = nextPoint;
    this.state = POINT;
  }

  removePoint() {
    this.setPoint();
    this.state = COMEOUT;
  }

  isComeout() {
    return this.point == null;
  }
}

module.exports = GameState;