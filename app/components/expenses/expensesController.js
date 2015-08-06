var app = angular.module('hpsa-client');

app.controller('UnsubmittedExpensesCtrl', ['$scope', '$location', '$filter', 'ExpensesService', 'ReportsService', 'ExpenseModalProvider', "ExpensesFilterProvider", 'DataSource', '$rootScope',
    function($scope, $location, $filter, ExpensesService, ReportsService, ExpenseModalProvider, ExpensesFilterProvider, DataSource, $rootScope){
        $rootScope.expenseTheme = true;
        $scope.categories = DataSource.ExpenseCategories;
        $scope.expenses = [];
        var requestParams = {};

        var refreshExpenses = function(){
            ExpensesService.getExpenses(requestParams)
                .success(function(result){
                    $scope.expenses = result.content;
                    $scope.totalPages = Math.ceil(result.totalCount/$scope.itemsPerPage);
                });
        };

        $scope.itemsPerPage = 10;

        $scope.maxDate = new Date();
        $scope.expFilter = {
            from: {
                opened: false,
                value: ExpensesFilterProvider.defaultFrom
            },
            to:{
                opened: false,
                value: ExpensesFilterProvider.defaultTo
            }
        };

        $scope.$watchGroup(['category', 'expFilter.from.value', 'expFilter.to.value'], function(){
            requestParams = {
                count: $scope.itemsPerPage};

            if($scope.category){
                requestParams.category = $scope.category;
            }

            requestParams.from = ExpensesFilterProvider.normalizeFrom($scope.expFilter.from.value);
            requestParams.to = ExpensesFilterProvider.normalizeTo($scope.expFilter.to.value);

            refreshExpenses();
        });

        $scope.$on('pageChanged', function(e, page){
            requestParams.skip = (page - 1) * $scope.itemsPerPage;
            ExpensesService.getExpenses(requestParams)
            .success(function(result){
                $scope.expenses = result.content;
            });
        });

        $scope.$on('expensesSubmitted', function(event, data){
            ReportsService.submitExpenses(data.expenses)
                .success(function(result){
                    $location.path('/editReport/'+result.reportId);
                });
        });

        $scope.openNewExpenseModal = function(){
            var modalInstance = ExpenseModalProvider.createExpense();
                modalInstance.result.then(function(){
                    refreshExpenses();
            });
        };
}]);