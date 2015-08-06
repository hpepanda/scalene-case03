angular.module('hpsa-client')
    .factory('ExpenseModalProvider', ['$modal', 'DataSource', function ($modal, DataSource) {
        var provider = {};

        provider.viewExpense = function (expense) {
            return $modal.open({
                    animation: true,
                    templateUrl: '/components/receipt-view-dialog/receiptModalTemplate.html',
                    controller: 'ReceiptModalCtrl',
                    resolve: {
                        model: function(){
                            return {
                                expense: expense
                            }
                        }
                    }
                }
            );
        };

        var openEditableModal = function(data){
            return $modal.open({
                animation: true,
                templateUrl: '/components/expense-edit-dialog/expenseDialogTemplate.html',
                controller: 'NewExpenseCtrl',
                resolve: {
                    model: function () {
                        return {
                            categories: DataSource.ExpenseCategories,
                            expense: data.item,
                            isNew: data.isNew
                        }
                    }
                }
            });
        }

        provider.createExpense = function () {
            var expense = {
                date: new Date()
            };
            return openEditableModal({item: expense, isNew: true});
        };

        provider.editExpense = function (expense) {
            return openEditableModal({item: expense, isNew: false});
        };

        return provider;
    }]);