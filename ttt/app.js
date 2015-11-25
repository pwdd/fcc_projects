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

var Cell = function(val, pos, css, win) {
  this.val = val;
  this.pos = pos;
  this.css = css;
  this.win = win;
};

var Board = function() {
  this.COMBOSIZE = 3;
  this.BOARDSIZE = 9;

  this.state = new Array(9);

  this.visualBoard = [
    new Cell("", 0, ["bb", "br"], ""), 
    new Cell("", 1, ["bb", "br"], ""), 
    new Cell("", 2, ["bb"], ""),
    new Cell("", 3, ["bb", "br"], ""), 
    new Cell("", 4, ["bb", "br"], ""), 
    new Cell("", 5, ["bb"], ""),
    new Cell("", 6, ["br"], ""),       
    new Cell("", 7, ["br"], ""),       
    new Cell("", 8, [], "")
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
    $scope.visualBoard = board.visualBoard;
    $scope.winningCombo = board.winningCombo;

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
            $scope.visualBoard[pos].val = $scope.human.symbol;
            board.state[pos] = -1;
            $scope.isTie();
            $scope.setMessage();
          } else {
            $scope.visualBoard[pos].val = $scope.computer.symbol;
            board.state[pos] = 1;
            $scope.isTie();
            $scope.setMessage();
          }
        }
      }
    };

    $scope.computerMove = function() {
      pos = $scope.search(0, 1, -100, 100);
      if (board.canMove(pos) && !board.isFull()) {
        $scope.setCellVal(pos, true);
        $scope.isTie();
        $scope.setMessage();
      };
    };

    $scope.finalMessage = "";

    $scope.checkWinner = function() {
      var human, computer, x;

      for (var combo = 0; combo < board.wins.length; combo++) {
        computer = human = board.COMBOSIZE;
        for (var w = 0; w < board.wins[combo].length; w++) {
          x = board.wins[combo][w];
          if (typeof board.state[x] != 'undefined') {
            if (board.state[x] > 0) {
              computer--;
            }
            if (board.state[x] < 0) {
              human--;
            }
          }
        }
        if (computer == 0) {
          return 1;
        }
        if (human == 0) {
          return -1;
        }
      }
    };

    $scope.setMessage = function() {
      if ($scope.checkWinner() == 1) {
        $scope.finalMessage = 'I win';
      }
      if ($scope.checkWinner() == -1) {
        $scope.finalMessage = 'You win';
      }
    }

    $scope.isTie = function() {
      if (board.isFull() && !$scope.checkWinner()) {
        $scope.finalMessage = "Keep trying, human...";
        return true;
      }
    };

    $scope.getWinningCombo = function() {
      if ($scope.checkWinner()) {
        var human, computer, x;
        for (var i = 0; i < board.wins.length; i++) {
          human = computer = board.COMBOSIZE;
          for (var e = 0; e < board.wins[i].length; e++) {
            x = board.wins[i][e];
            if (board.state[x] == 1) {
              computer--;
            }
            if (board.state[x] == -1) {
              human--;
            }
          }
          if (computer == 0 || human == 0) {
            return board.wins[i];
          }
        }
      }
    };

    $scope.addWinCss = function() {
      if ($scope.getWinningCombo()) {
        $scope.winningCombo = $scope.getWinningCombo();
        for (var i = 0; i < $scope.winningCombo.length; i++) {
          var pos = $scope.winningCombo[i];
          $scope.visualBoard[pos].win = "win";
          console.log($scope.visualBoard[pos].win);
        }
      }
    };

    /*
     * negamax search with alpha beta pruning
     * base on this algorithm: http://www.hamedahmadi.com/gametree/
     * with help from: 
     * https://www.youtube.com/watch?v=J1GoI5WHBto 
     * http://web.cs.wpi.edu/~rich/courses/imgd4000-d09/lectures/E-MiniMax.pdf
     */
    $scope.search = function(depth, currentPlayer, alpha, beta) {
      var maxDepth = 10;
      var infinity = 100;
      var i = board.BOARDSIZE;
      var min = -infinity;
      var max, value, next, undefinedValue;
      if (value = $scope.checkWinner() || depth == maxDepth) {
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



















