angular.module('hpsa-client').factory('ObservableService', function(){
    var service = {};
    var handlers = [];

    service.register = function(handler){
        handlers.push(handler);
    };

    service.notify = function(data){
        angular.forEach(handlers, function(handler){
            handler(data);
        });
    };

    return service;
});