const { randomBetween } = require('./randomUtil');

describe('randomUtil', () => {
  describe('randomBetween', () => {
    const low = 1;
    const high = 6;
    const runs = 1000;

    it('should generate numbers between the low and high', () => {
      const set = new Set();
      for (let i=0; i<runs; i++) {
        set.add(randomBetween(low, high));
      }

      for (let i=low; i<=high; i++) {
        expect([...set]).toContain(i);
      }
    });
  });
});
