var expensesListModule = angular.module('hpExpensesListDirective', [])
    .directive('hpExpensesList', function(){
        return {
            restrict: 'E',
            templateUrl: '/shared/expenses-list-directive/expensesListTemplate.html',
            scope:{
                mode: '=?', //unsubmitted, onReport, submitted
                pages: '=',
                expensesSrc: '=',
                addToReportCaption: "=?",
                id: '='
            },
            controller: function($scope, DataSource, ExpensesService, ExpenseModalProvider){
                $scope.randomId = Math.random();
                $scope.mode = $scope.mode || 'unsubmitted';
                $scope.editable = $scope.mode != "submitted";
                $scope.selectable = $scope.mode == "unsubmitted";

                $scope.addToReportCaption = $scope.addToReportCaption || 'Add to Report';

                $scope.expenses = [].concat($scope.expensesSrc);

                $scope.allChecked = false;
                $scope.categories = DataSource.ExpenseCategories;

                $scope.setPersonal = function(item){
                    if(item.personal){
                        item.checked = false;
                    }
                    ExpensesService.save(item);
                };

                $scope.expenseSelected = function(){
                    $scope.hasSelectedItems = $scope.expenses.some(function(item){
                        return item.checked;
                    });
                };

                $scope.addToReport = function(){
                    var expensesCollection = [];
                    var total = 0;
                    $scope.expenses.forEach(function(item){
                        if(item.checked){
                            expensesCollection.push(item.expenseId);
                            total += item.amount;
                        }
                    });
                    $scope.$emit('expensesSubmitted', {
                        expenses: expensesCollection,
                        total: total});
                };

                $scope.editExpense = function(item){
                    var modalInstance = ExpenseModalProvider.editExpense(item);
                };

                $scope.showReceiptDialog = function(item){
                    var modalInstance = ExpenseModalProvider.viewExpense(item);
                };

                $scope.toggleSelectionForAll = function(){
                    $scope.expenses.forEach(function(item){
                        item.checked = $scope.allChecked && !item.personal;
                    });
                    $scope.hasSelectedItems = $scope.allChecked;
                };
            }
        };
    });
