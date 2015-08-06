var app = angular.module('hpsa-client');

app.controller('RequestProfilerCtrl', ['$scope', '$location', 'RequestProfiler',
    function($scope, $location, RequestProfiler){

    RequestProfiler.onResponseReceived(function(state){
        $scope.serverName = state.host;
        $scope.totalDuration = state.duration;
    });
}]);