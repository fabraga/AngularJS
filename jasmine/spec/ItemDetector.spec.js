describe("ItemDetector", function () {
  var itemsWithoutCookies;
  var itemsWithCookies;
  var cookie;

  beforeEach(function() {
    cookie = "cookie";
    itemsWithoutCookies = ['apples', 'pears', 'bananas'];
    itemsWithCookies = ['bread', 'milk', 'Cookies'];
  });

  it("should be able to detect NO cookies", function () {
    var result = detectItem(cookie, itemsWithoutCookies);
    expect(result).not.toBe(true);
  });

  it("should be able to detect cookies", function() {
    var result = detectItem(cookie, itemsWithCookies);
    expect(result).toBe(true);
  });

});
