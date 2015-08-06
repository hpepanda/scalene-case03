angular.module('hpsa-client')
    .controller('NewReportController', ['$scope','$location', '$routeParams', 'ExpensesService', 'ReportsService', 'ExpenseModalProvider', '$rootScope',
        function($scope, $location, $routeParams, ExpensesService, ReportsService, ExpenseModalProvider, $rootScope){
            $rootScope.expenseTheme = false;

            $scope.itemsPerList = 5;
            $scope.isReportValid = true;
            var defaultParams = {skip: 0, count: $scope.itemsPerList};

            var getUnsubmittedExpenses = function(params){
                ExpensesService.getExpenses(params || defaultParams)
                .success(function(result){
                    $scope.unsubmittedExpenses = result.content;
                    $scope.unsubmittedPagesCount = Math.ceil(result.totalCount/$scope.itemsPerList);
                });
            };

            var getExpensesOnReport = function(params){
                params = params || angular.copy(defaultParams);
                params.reportId = $scope.report.reportId;

                ExpensesService.getExpenses(params)
                .success(function(result){
                    $scope.expenses = result.content;
                    $scope.submittedPagesCount = Math.ceil(result.totalCount/$scope.itemsPerList);
                });
            };

            var getReport = function(){
                return ReportsService.getById($routeParams.id)
                    .success(function(report){
                        $scope.report = report;
                    });
            };
            
            if(!$routeParams.id){
                $scope.title = "New Report";
                $scope.report = {
                    total: 0
                };
                $scope.expenses = [];
            }
            else{
                $scope.title = "Edit Report";
                getReport().then(function(){
                    getExpensesOnReport();
                });
            }

            getUnsubmittedExpenses();

            $scope.$on('pageChanged', function(e, page){
                var params = {
                    skip: (page - 1) * $scope.itemsPerList,
                    count: $scope.itemsPerList};
                
                if(e.targetScope.relatedTable == 'list-on-report'){
                    getExpensesOnReport(params);
                }
                else{
                    getUnsubmittedExpenses(params);
                }                
            });

            $scope.$on('expensesSubmitted', function(e, data){
                ReportsService.submitExpenses(data.expenses, $scope.report.reportId)
                    .success(function(result){
                        $scope.report.reportId = result.reportId;
                        $scope.report.total += data.total;

                        getExpensesOnReport();
                        getUnsubmittedExpenses();
                    });
            });

            $scope.submitReport = function(){
                if(!$scope.report.name){
                    $scope.isReportValid = false;
                    return;
                }
                $scope.report.date = $scope.report.date || new Date();
                 ReportsService.save($scope.report)
                    .success(function(result){
                        var reportId = result.reportId || $scope.report.reportId;
                        $location.path('/viewReport/' + reportId);
                    });
            };

            $scope.openCreateExpenseModal = function(){
                var modalInstance = ExpenseModalProvider.createExpense();
                modalInstance.result.then(function(){
                    getUnsubmittedExpenses();
                });
            };
    }]);