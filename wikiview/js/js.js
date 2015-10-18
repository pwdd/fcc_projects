(function() {
  var app = angular.module('app', ['ngSanitize']);

  app.controller('ResultsController', [
    '$scope', 
    '$http', 
    function($scope, $http) {

      var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&prop=info&srprop=snippet&inprop=url&srsearch=';

      var callback = '&callback=JSON_CALLBACK';

      $scope.fetch = function() {
        $http.jsonp(url + $scope.search + callback)
        .success(function(response) {
          $scope.results = response.query.search;
        });
      };
      
      $scope.select = function() {
        this.setSelectionRange(0, this.value.length);
      };
  }]);

  app.filter('unsafe', function($sce) {
    return function(str) {
      return $sce.trustAsHtml(str) + "...";
    };
  });
})();