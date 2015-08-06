angular.module('hpFileUpload')
    .factory('ReceiptUploader', ['$http', 'AppSettings', function($http, AppSettings){
        var service = {};

        var url = AppSettings.apiUrl + "image64";

        service.upload = function(file){
            var config = {
                headers: {
                    'Content-Type': file.type
                }
            };
            return $http.post(url, file.data, config);
        };

        return service;
    }]);