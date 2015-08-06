angular.module('hpFileUpload')
    .directive('hpFileUploader', function(){
        return{
            restrict: 'E',
            templateUrl: 'shared/file-uploader/fileUploaderTemplate.html',
            require: 'ngModel',
            transclude: true,
            link: function(scope, element, attrs, ngModel){
                scope.name = "Upload File";
                var updateModel = function () {
                    scope.$apply(function () {
                        var file = $(element).find('input')[0].files[0];
                        scope.name = file.name;

                        var reader = new FileReader();
                        reader.onloadend = function(e){
                            ngModel.$setViewValue({
                                data: e.target.result,
                                type: file.type,
                                size: file.size,
                                name: file.name
                            });
                        };
                        reader.readAsDataURL(file);
                    });
                };

                $(element).on('change', 'input', updateModel)
            }
        };
    })