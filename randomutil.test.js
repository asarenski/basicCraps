const { randomBetween } = require('./randomUtil');

describe('randomUtil', () => {
  describe('randomBetween', () => {
    it('should generate numbers between the low and high', () => {
      const low = 1;
      const high = 6;
      const set = new Set();
      for (let i=0; i<2000; i++) {
        set.add(randomBetween(low, high));
      }

      for (let i=1; i<=6; i++) {
        expect([...set]).toContain(i);
      }
    });
  });
});
