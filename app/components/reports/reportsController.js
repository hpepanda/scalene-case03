var app = angular.module('hpsa-client');

app.controller('ReportsCtrl', ['$scope', '$location', 'ReportsService', '$rootScope',
    function($scope, $location,ReportsService, $rootScope){
        $rootScope.expenseTheme = false;

        $scope.itemsPerPage = 6;
        $scope.reports = [];
        $scope.busy = false;

        $scope.updateReports = function(tableState) {

            $scope.busy = true;

            var pagination = tableState.pagination;

            var start = pagination.start || 0;
            var number = pagination.number || $scope.itemsPerPage;

            ReportsService.getReports({
                skip: start,
                count: number
            }).success(function (result) {
                $scope.reports = result.content;
                tableState.pagination.numberOfPages = Math.ceil(result.totalCount/$scope.itemsPerPage);
                $scope.busy = false;
            });
        };

        $scope.redirectToNewReport = function(){
            $location.path('/newReport');
        }
    }]);