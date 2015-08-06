var app = angular.module('hpsa-client');

app.factory('ExpensesService', ['$http', 'AppSettings',
    function($http, AppSettings){
        var service = {};

        var url = AppSettings.apiUrl + 'expenses';

        service.getExpenses = function(params){
            return $http.get(url,{
                params: params
            });
        };

        var create = function(expense){
            return $http.post(url, expense);
        };

        var update = function(expense){
            return $http.patch(url, expense);
        };

        service.save = function(expense){
            return !expense.expenseId ? create(expense) : update(expense);
        };

        return service;
}]);