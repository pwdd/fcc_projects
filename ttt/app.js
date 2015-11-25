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
      if ($scope.human.symbol != undefined && !$scope.checkWinner()) {
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
      pos = $scope.search(0, 1, -100, 100);
      if (board.canMove(pos) && !board.isFull()) {
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

  /*
   * negamax search with alpha beta pruning
   * base on this: http://www.hamedahmadi.com/gametree/
   */
  $scope.search = function(depth, currentPlayer, alpha, beta) {
    var maxDepth = 6;
    var infinity = 100;
    var i = board.BOARDSIZE;
    var min = -infinity;
    var max, value, next, undefinedValue;
    if (value = $scope.checkWinner() || depth > maxDepth) {
      return value * currentPlayer;
    }
    if (maxDepth > depth) {
      while(i--) {
        if (!board.state[i]) {
          board.state[i] = currentPlayer;
          value = - $scope.search(depth + 1, -currentPlayer, -beta, -alpha);
          board.state[i] = undefined;
          if (max == undefined || value > max) {
            max = value;
          }
          if (value > alpha) {
            alpha = value;
          }
          if (alpha >= beta) {
            return alpha;
          }
          if (max > min) {
            min = max;
            next = i;
          }
        }
      }
    }
    return depth ? max || 0 : next;
  };

  }]);

})();



















