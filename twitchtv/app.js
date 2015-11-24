(function() {
  var app = angular.module('fccapp', []);

  var streammers = [
    "freecodecamp", 
    "storbeck", 
    "terakilobyte", 
    "habathcx",
    "RobotCaleb",
    "thomasballinger",
    "noobs2ninjas",
    "medrybw",
    "beohoff"
  ];

  var url = 'https://api.twitch.tv/kraken/'

  app.controller('MainController', ['$scope', '$http', function($scope, $http) {

    $scope.entries = [];
    $scope.online = [];
    $scope.offline = [];
    
    streammers.forEach(function(name) {
      $http.jsonp(url + "streams/" + name + "?callback=JSON_CALLBACK")
      .success(function(response) {
        if (response.stream !== null) {
          $scope.entries.push(angular.extend(response));
          $scope.online.push(angular.extend(response))
        } else{
          $http.jsonp(url + "channels/" + name + "?callback=JSON_CALLBACK")
          .success(function(data) {
            $scope.entries.push(angular.extend(data));
            $scope.offline.push(angular.extend(data));
          });
        };
      })
      .error(function(response) {
        $scope.entries.push(angular.extend(response));
      });
    });

    $scope.tab = 1;
    
    $scope.setTab = function(selected) {
      $scope.tab = selected;
    };

    $scope.isSet = function(set) {
      return $scope.tab === set;
    };
  }]);

  

})();
