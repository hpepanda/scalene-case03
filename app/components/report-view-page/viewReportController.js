angular.module('hpsa-client')
.controller('ViewReportCtrl', ['$scope', '$location', '$routeParams', 'ExpensesService', 'ReportsService', '$rootScope',
     function($scope, $location, $routeParams, ExpensesService, ReportsService, $rootScope){
         $rootScope.expenseTheme = false;

         $scope.itemsPerList = 10;
         var getExpensesParams = {
             count: $scope.itemsPerList,
             reportId: $routeParams.id
         };

         ReportsService.getById($routeParams.id)
             .success(function(result){
                $scope.report = result;
         });

         var getExpensesOnReport = function(){
             ExpensesService.getExpenses(getExpensesParams)
                 .success(function(result){
                     $scope.expenses = result.content;
                     $scope.pagesCount = Math.ceil(result.totalCount/$scope.itemsPerList);
                 });
         };

         getExpensesOnReport();

         $scope.$on('pageChanged', function(e, page){
             getExpensesParams.skip = (page - 1) * $scope.itemsPerList;
             getExpensesOnReport();
         });

         $scope.backToHome = function(){
             $location.path('/home');
         }
    }]);