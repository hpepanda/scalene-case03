angular.module('hpReportDetailsDirective', [])
.directive('hpReportDetails', function(){
       return {
           restrict: 'E',
           templateUrl: function(elem, attrs){
               return attrs.editable == "true" ? '/shared/report-details-directive/editReportDetailsTemplate.html'
                   : '/shared/report-details-directive/viewReportDetailsTemplate.html'
           },
           scope: {
               report: "=",
               valid: "="
           },
           controller: function($scope){
               $scope.reportForm = {};
               var initial = true;

               $scope.$watch('valid', function(){
                   $scope.reportForm.reportName.$setValidity('required', $scope.valid);
                   if(!initial){
                       $scope.reportForm.reportName.$setTouched();
                   }
                   else{
                       initial = false;
                   }
               })
           }
       }
    });