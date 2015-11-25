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

var Cell = function(val, pos, css) {
  this.val = val;
  this.pos = pos;
  this.css = css;
};

var Board = function() {
  this.COMBOSIZE = 3;
  this.BOARDSIZE = 9;

  this.state = new Array(9);

  this.board = [
    new Cell("", 0, ["bb", "br"]), new Cell("", 1, ["bb", "br"]), new Cell("", 2, ["bb"]),
    new Cell("", 3, ["bb", "br"]), new Cell("", 4, ["bb", "br"]), new Cell("", 5, ["bb"]),
    new Cell("", 6, ["br"]),       new Cell("", 7, ["br"]),       new Cell("", 8, [])
  ];

  this.wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ];

  this.winningCombo = null;

  this.canMove = function(pos) {
    return this.state[pos] === undefined;
  };

  this.isFull = function() {
    for (var i = this.state.length - 1; i >= 0; i--) {
      if (this.state[i] == undefined) {
        return false;
      }
    }
    return true;
  };
};

/*
 * app
 */

(function() {
  var ttt = angular.module('tictactoe', []);

  ttt.service('board', [Board]);

  ttt.controller('GameController', ['$scope', 'board', function($scope, board) {
    $scope.board = board.board;

    $scope.setPlayerSymbol = function(symbol) {
      if (symbol == 'x') {
        $scope.human = new Player('x', false);
        $scope.computer = new Player('o', true);
      } else {
        $scope.human = new Player('o', false);
        $scope.computer = new Player('x', true);
      };
    };

    $scope.setCellVal = function(pos, isComputer) {
      if ($scope.human.symbol != undefined) {
        if (board.canMove(pos)) {
          if (!isComputer) {
            $scope.board[pos].val = $scope.human.symbol;
            board.state[pos] = -1;
          } else {
            $scope.board[pos].val = $scope.computer.symbol;
            board.state[pos] = 1;
          }
        }
      }
    };

    $scope.computerMove = function() {
      pos = 3; // this will be set by search 
      if (board.canMove(pos)) {
        $scope.setCellVal(pos, true);
      };
    };

    $scope.checkWinner = function() {
      var h, c, x;

      for (var combo = 0; combo < board.wins.length; combo++) {
        c = h = board.COMBOSIZE;
        for (var w = 0; w < board.wins[combo].length; w++) {
          x = board.wins[combo][w];
          if (board.state[x] > 0 && board.state[x] != undefined) {
            c--;
          }
          if (board.state[x] < 0 && board.state[x] != undefined) {
            h--;
            console.log(h);
          }
        }
        if (c === 0) {
          board.winningCombo = board.wins[combo];
          return 1;
        }
        if (h === 0) {
          board.winningCombo = board.wins[combo];
          return -1;
        }
      }
    };

  }]);

})();



















