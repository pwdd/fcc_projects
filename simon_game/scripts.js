$(function() {

  var getRandomNumber = function() {
    return Math.floor((Math.random() * 4) + 1);
  };

  var animateClick = function(div) {
    var value = $(div).data('value');
    value = value.toString();
    var audio = document.getElementById(value); 
    $(div).addClass('light');
    audio.play();
    setTimeout(function() {
      $(div).removeClass('light');
    }, 500);
  };

  var Game = function() {
    this.BLINK = 500;
    this.pause = 1500;
    this.speed = 1000;
    this.count = 0;
    this.message = "";
    this.gameSequence = [];
    this.copy = [];
    this.mode = 'normal';
    this.gameOn = true;

    this.init = function() {
      var game = this;      
      $('#start').click(function() {
        game.mode = 'normal'
        game.startGame(game.mode);
        $('#strict').removeClass('strict-on');
        $('#strict').text('strict OFF');
        $('#start').addClass('normal');
      });
      $('#strict').click(function() {
        game.mode = 'strict';
        game.startGame(game.mode);
        $('#strict').addClass('strict-on');
        $('#start').removeClass('normal');
        $('#strict').text('strict ON');
      });
    };

    this.startGame = function(mode) {      
      this.pause = 1500;
      this.speed = 1000;
      this.count = 0;
      this.message = "";
      this.gameSequence = [];
      this.copy = [];
      this.gameOn = true;
      this.mode = mode;
      this.newState();
    };

    this.newState = function() {
      var game = this;
      game.count++;
      game.showCount();
      game.changeSpeed();
      game.gameSequence.push(getRandomNumber());
      game.copy = game.gameSequence.slice(0);
      game.animateSequence(game.gameSequence);
    };

    this.animateSequence = function(sequence) {
      var i = 0;
      var game = this;
      var interval = setInterval(function() {
        var value = (sequence[i]).toString();
        var div = $('#the-game').find("[data-value='" + value + "']");
        var audio = document.getElementById(value);
        audio.play();
        game.changeColor(div);
        i++;
        if (i >= sequence.length) {
          clearInterval(interval);
          game.activeBoard();
        }
      }, game.pause);
    };

    this.changeColor = function(div) {
      game = this;
      $(div).addClass('light');
      setTimeout(function() {
        $(div).removeClass('light');
      }, game.BLINK);
    };

    this.collectClick = function(e) {
      // pop out the first element of sequence (copy) and return element
      this.message = "";
      this.changeMessage();
      var rightAnswer = this.copy.shift(); 
      // the data-value of clicked element
      var collectedAnswer = $(e.target).data('value');
      animateClick($(e.target));
      // if user clicked right
      this.gameOn = (rightAnswer === collectedAnswer);
      // check if user can keep on clicking
      this.canContinue();
    }

    this.canContinue = function() {
      var game = this;
      if (game.copy.length === 0 && game.gameOn) {
        game.blockBoard();
        game.newState();
      }
      else if (!game.gameOn && game.mode === 'normal') {
        game.message = 'You made a mistake';
        game.changeMessage();
        game.copy = game.gameSequence.slice(0);
        game.animateSequence(game.gameSequence);
      }
      else if (!game.gameOn && game.mode === 'strict') {
        game.startGame('strict');
      }
    };

    this.activeBoard = function() {
      var game = this;
      $('#the-game').on('click', '[data-value]', function(e) {
        game.collectClick(e);
      });
    };

    this.blockBoard = function() {
      $('#the-game').off('click', '[data-value]');
      $('#controls').off('click', 'button')
    };

    this.changeSpeed = function() {
      var game = this;
      if (game.count > 5 && game.count <= 9) {
        game.pause = 900;
      }
      if (game.count > 9 && game.count <= 13) {
        game.pause = 500;
      }
      if (game.count > 13) {
        game.pause = 300;
      }
    };

    this.showCount = function() {
      var game = this;
      $('#count').text(game.count);
    }

    this.changeMessage = function() {
      $('#message').text(game.message); 
    }
  };

  game = new Game();
  game.init();
});



