angular.module('hpsa-client').factory('RequestProfiler', ['$q', 'ObservableService',
    function($q, ObservableService){
    var profiler = {};

    var requestState= {
        start: 0,
        finish: 0,
        url: null
    };

    var notify = function(){
        ObservableService.notify({
            host: requestState.url,
            duration: requestState.finish - requestState.start,
            provider: requestState.provider
        });
    };

    profiler.onResponseReceived = function(callback){
        ObservableService.register(callback)
    };

    profiler.request = function (config){
        requestState.start = new Date().getTime();
        return config;
    };

    profiler.response = function (response){
        requestState.finish = new Date().getTime();
        requestState.url = response.headers('hp-server');
        requestState.provider = response.headers('x-provider');
        if(requestState.url){
            notify();
        }
        return response;
    };

    return profiler;
}]);

