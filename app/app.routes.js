var app = angular.module('hpsa-client');

app.config(['$routeProvider',
    function($routeProvider){
        $routeProvider
            .when('/home',{
                templateUrl: 'components/reports/reports.html',
                controller: 'ReportsCtrl',
                css: 'components/reports/reports.css'
            })
            .when('/expenses', {
                templateUrl: 'components/expenses/expenses.html',
                controller: 'UnsubmittedExpensesCtrl',
                css: 'components/expenses/expenses.css'
            })
            .when('/newReport', {
                templateUrl: 'components/report-edit-page/newReport.html',
                controller: 'NewReportController',
                css: 'components/report-edit-page/newReport.css'
            })
            .when('/editReport/:id', {
                templateUrl: 'components/report-edit-page/newReport.html',
                controller: 'NewReportController',
                css: 'components/report-edit-page/newReport.css'
            })
            .when('/viewReport/:id', {
                templateUrl: 'components/report-view-page/viewReport.html',
                controller: 'ViewReportCtrl'
            })
            .otherwise({
                redirectTo: '/home'});
    }
]);