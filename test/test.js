// Starter test from mochajs.org
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Math', function() {
    it('should test if 3*3 = 9', function(){
      assert.equal(9, 3*3);
    });
    it('should test if (3-4)*8 = -8', function(){
      assert.equal(-8, (3-4)*8);
    });
});

var ass = require('chai').assert;
var numbers = [1, 2, 3, 4, 5];

ass.isArray(numbers, 'is array of numbers');
ass.include(numbers, 2, 'array contains 2');
ass.lengthOf(numbers, 5, 'array contains 5 numbers');