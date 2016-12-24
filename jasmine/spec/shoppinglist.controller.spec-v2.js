describe("Spec v2: ShoppingListController", function () {

  beforeEach( function () {
    module( function ($provide) {
      $provide.service('SLServiceErrorMock', function () {
        var service = this;
        service.addItem = function (name, qtty) {
          throw new Error("Test message.");
        };
        service.getItems = function () {
          return null;
        };
      });
    });

    module('ShoppingListApp');
  });

  var $controller;
  var ShoppingListController;

  beforeEach(inject(function (_$controller_, SLServiceErrorMock) {
    $controller = _$controller_;

    shoppingListController = $controller('ShoppingListController', {ShoppingListService: SLServiceErrorMock});
  }));

  it("should change error message in controller", function () {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });

});
