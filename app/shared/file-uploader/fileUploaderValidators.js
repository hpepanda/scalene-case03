var uploadModule = angular.module('hpFileUpload', []);

uploadModule
    .directive('fileSize', function(){
        return {
            require: 'ngModel',
            link: function(scope, element, attr, ngModel){
                var maxSize = attr.fileSize;
                ngModel.$validators.fileSize = function(modelValue){
                    if(modelValue && modelValue.size > maxSize * 1024 * 1024)
                        return false;
                    return true;
                }
            }
        }
    });

var validTypes = ["image/jpeg", "image/gif", "image/png", "image/pjpeg"];

uploadModule
    .directive('image', function(){
        return {
            require: 'ngModel',
            link: function(scope, element, attr, ngModel){
                ngModel.$validators.image = function(modelValue){
                    if(modelValue && modelValue.type)
                        return validTypes.indexOf(modelValue.type) != -1;
                    return true;
                }
            }
        };

    });
