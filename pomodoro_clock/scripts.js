$(function() {
  var breakLength = $('#set-break').text();
  var workLength = $('#set-work').text();

  var getMin = $('#minutes').text();
  var getSec = $('#seconds').text();

  var none = true;
  var work = false;
  var breakTime = false;

  var timeRunning = false;
  var paused = false;
  var runningTimer;

  var activeClasses = function() {
    if (none) {
      $('#work').addClass('btn-primary');
      $('#work').removeClass('btn-danger');
      $('#work').removeClass('disabled');      
      
      $('#break').addClass('btn-primary');
      $('#break').removeClass('btn-danger');
      $('#break').removeClass('disabled');
      
      $('#controls').addClass('hidden');

    } else if (work) {
      $('#work').addClass('btn-danger');
      $('#work').removeClass('btn-primary');
      
      $('#break').addClass('btn-primary');
      $('#break').removeClass('btn-danger');
      
      $('#controls').removeClass('hidden');
    } else {
      $('#break').addClass('btn-danger');
      $('#break').removeClass('btn-primary');

      $('#work').addClass('btn-primary');      
      $('#work').removeClass('btn-danger');

      $('#controls').removeClass('hidden');
    }
  }

  var changeImage = function() {
    if (none) {
      $('#image').addClass('hidden');
      clearInterval(runningTimer);
    } else if (work) {
      $('img').attr('src', 'img/work.gif');
      $('#image').removeClass('hidden');
    } else {
      $('img').attr('src', 'img/break.gif');
      $('#image').removeClass('hidden');
    }
  };

  var timerOn = function(v) {
    if (timeRunning) {
      clearInterval(runningTimer);
      none = true
      changeImage();
      none = false;
      v = true;
    };
  };

  var leadingZero = function(n) {
    if (n.length != 2) {
      if (n < 10) {
        n = "0" + n;
      } 
    }
    return n;
  };

  var timer = function() {
    var min = $('#minutes').text();
    var sec = $('#seconds').text();
    if (min == "00" && sec == "00") {
      clearInterval(runningTimer);
      if (work) {
        work = false;
        breakTime = true;
        activeClasses();
        changeImage();
        t = leadingZero(breakLength);
        $('#minutes').text(t);
        runningTimer = setInterval(timer, 1000);
      } else if (breakTime) {
        breakTime = false;
        work = true;
        activeClasses();
        changeImage();
        t = leadingZero(workLength);
        $('#minutes').text(t);
        runningTimer = setInterval(timer, 1000);
      }
    } else {
      sec -= 1;
      if (min < 0) {
        return clearInterval(runningTimer);
      }
      if (sec < 0 && min != 0) {
        min -= 1;
        sec = 59;
      }
      m = leadingZero(min);
      s = leadingZero(sec);
      $('#minutes').text(m);
      $('#seconds').text(s);
    };
  };

  $('#work-minus').click(function() {
    if (workLength > 0) {
      workLength--;
      t = leadingZero(workLength)
      $('#set-work').text(t);
    };
  });

  $('#work-plus').click(function() {
    if (workLength < 59) {
      workLength++;
      t = leadingZero(workLength)
      $('#set-work').text(t);
    };
  });

  $('#break-minus').click(function() {
    if (breakLength > 0) {
      breakLength--;
      t = leadingZero(breakLength)
      $('#set-break').text(t);
    };
  });

  $('#break-plus').click(function() {
    if (breakLength < 59) {
      breakLength++;
      t = leadingZero(breakLength)
      $('#set-break').text(t);
    };
  });

  $('#work').click(function() {
    work = true;
    breakTime = false;
    none = false;
    timerOn(work);
    t = leadingZero(workLength);
    $('#minutes').text(t);
    $('#seconds').text('00');
    activeClasses();
  });

  $('#break').click(function() {
    breakTime = true;
    work = false;
    none = false;
    timerOn(breakTime);
    t = leadingZero(breakLength);
    $('#minutes').text(t);
    $('#seconds').text('00');
    activeClasses();
  });

  $('#play').click(function() {
    if (timeRunning == false || paused == true) {
      changeImage();
      timeRunning = true;
      paused = false;
      runningTimer = setInterval(timer, 1000);
      $('#work').addClass('disabled');
      $('#break').addClass('disabled');
    } else {
      return;
    }
  });

  $('#pause').click(function() {
    timeRunning = true;
    paused = true;
    clearInterval(runningTimer);
  });

  $('#stop').click(function() {
    timeRunning = false;
    clearInterval(runningTimer);
    $('#minutes').text("00");
    $('#seconds').text("00");
    $('#work').removeClass('disabled');
    $('#break').removeClass('disabled');
    none = true;
    changeImage();
    activeClasses();
  });

});