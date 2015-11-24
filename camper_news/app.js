(function() {
  var app = angular.module("camperNews", []);

  var url = 'http://www.freecodecamp.com/news/hot'

  app.controller('NewsController', ['$scope', '$http', function($scope, $http) {
    $http.get(url)
    .success(function(response) {
      $scope.news = response;
      
    })
    .error(function(response) {
      console.log("something went wrong");
    })
  }]);

})();