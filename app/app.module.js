var app = angular.module('hpsa-client',
    [
        'ngRoute',
        'routeStyles',
        'smart-table',
        'ui.bootstrap',
        'hpExpensesListDirective',
        'hpReportDetailsDirective',
        'hpFileUpload'

    ]);

app.config(function($httpProvider){
    $httpProvider.interceptors.push('RequestProfiler');
});

