var assert = require('assert');

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});

describe('Simple math operations', function() {
    describe('plus', function() {
        it('should return sum of two numbers', function() {
            assert.equal(5, 2 + 3);
        });
    });
});