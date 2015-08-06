var app = angular.module('hpsa-client');

app.factory('ReportsService', ['$http', 'AppSettings',
    function($http, AppSettings){
        var service = {};
        var url = AppSettings.apiUrl + 'reports';
        var assignExpensesUrl = url + '/assignExpenses';
        var getByIdUrl = url + '/getById';

        var reports = [];

        service.getReports = function(params){
            return $http.get(url, {
                params: params
            });
        };

        service.getById = function(id){
            return $http.get(getByIdUrl, {
                params: {
                    reportId: id
                }
            });
        };

        var create = function(report){
            return $http.post(url, report);
        };

        var update = function(report){
            return $http.patch(url, report);
        };

        service.save = function(report){
            if(report.reportId){
                return update(report);
            }
            else{
                report.date = new Date();
                return create(report);
            }
        };

        service.submitExpenses = function(expenses, reportId){
            var params = reportId ? {reportId:  reportId } : {};
            params.expenses = expenses;

            return $http.post(assignExpensesUrl, params);
        };

        return service;
    }]);