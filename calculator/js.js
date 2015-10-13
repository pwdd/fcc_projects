$(function() {
  var opClicked = false;
  var started = false;
  var resultArray = [];
  var result;
  
  $('.number').click(function() {
    var value = $(this).attr('data-value');
    if (started == false) {
      $('#output').empty();
      started = true;
    };
    if ($('#output').text().length < 10 && opClicked == false) {
      $('#output').append(value);
    } else if (opClicked == true) {
      $('#output').empty();
      opClicked = false;
      $('#output').append(value);
    }
  });

  $('#clear').click(function() {
    location.reload();
  });

  $('.button').click(function() {
    var operator = $(this).attr('data-operator');
    resultArray.push(parseFloat($('#output').text()));
    resultArray.push(operator);
    started = true;
    opClicked = true;
  })

  $('#equal').click(function() {
    resultArray.push(parseFloat($('#output').text()));
    result = resultArray[0];
    for (var i = 1; i < resultArray.length; i++) {
      if (resultArray[i] == "plus") {
        result += resultArray[i + 1];
        console.log(result);
      } else if (resultArray[i] == "minus") {
        result -= resultArray[i + 1];
        console.log(result);
      } else if (resultArray[i] == "multiply") {
        result *= resultArray[i + 1];
      } else if (resultArray[i] == "divide") {
        result /= resultArray[i + 1];
      };
    };
    if (result.toString().length > 10) {
      result = "~" + result.toString().substr(0, 10);
    };
    $('#output').text(result);
    started = false;
    opClicked = false;
    resultArray = [];
  });
});

















