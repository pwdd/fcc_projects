var quotes = {
  "Requiem for a Nun": "The past is never dead. It's not even past.",
  "The Sound and the Fury": "Because no battle is ever won he said. They are not even fought. The field only reveals to man his own folly and despair, and victory is an illusion of philosophers and fools.",
  "The Wild Palms": "Between grief and nothing I will take grief.",
  "As I Lay Dying": "Sin and love and fear are just sounds that people who never sinned nor loved nor feared have for what they never had and cannot have until they forget the words.",
  "The Bear": "Be scared. You can't help that. But don't be afraid."
};

function getQuote() {
  var min = 0;
  var arr = Object.keys(quotes);
  var max = arr.length - 1;
  var i = Math.floor(Math.random() * (max - min + 1)) + min;
  var quote = quotes[arr[i]];
  var book = arr[i];
  document.getElementById("quote").innerHTML = "\"".concat(quote, "\"");
  document.getElementById("book").innerHTML = book;
  var a = document.getElementById("share");
  var quoteUrl = quote.replace(/\s+/g, "%20");
  var tweet = "http://twitter.com/share?text=".concat(quoteUrl, "&url=http://codepen.io/pwdd/full/yNdKwJ&hashtag=fcc-project");
  a.setAttribute("href", tweet);
};