const assert = require('chai').assert;


function addValue(a, b) {
    return a + b;
}

describe('Unit Test', () => {
  it('should return 2', () => {
    let va = addValue(2, 2);
    assert.equal(va, 4);
  });
});