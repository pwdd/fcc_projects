/*
 * load modal
 */

$(function() {
  $(window).load(function() {
    $('#choice').modal('show');
  });
});

/*
 * classes
 */

var Player = function(symbol, isComputer) {
  this.symbol = symbol;
  this.isComputer = isComputer;
};


/*
 * app
 */

(function() {
  var ttt = angular.module('tictactoe', []);

  ttt.controller('GameController', ['$scope', function($scope) {
    $scope.setPlayerSymbol = function(symbol) {
      if (symbol == 'x') {
        $scope.human = new Player('x', false);
        $scope.computer = new Player('o', true);
      } else {
        $scope.human = new Player('o', false);
        $scope.computer = new Player('x', true);
      };
    };

  }]);

})();

