// Putting an 'x' in front of "describe" disable the test
// xdescribe("OddEvenGenerator", function () {
describe("Odd Even Generator", function () {
  var randomNumGenerator8;
  var randomNumGenerator3;

  beforeEach(function() {
    randomNumGenerator8 = function(to, from) {
      return 8;
    };
    randomNumGenerator3 = function(to, from) {
      return 3;
    };
  });

  it("should produce an odd number", function () {
    var result = getRandomOddOrEven1to10("odd", randomNumGenerator3);
    expect(result).toEqual(3);
  });

  xit("should procude an even number", function() {
    var result = getRandomOddOrEven1to10("even", randomNumGenerator8);
    expect(result).toEqual(8);
  });

});
