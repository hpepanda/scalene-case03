angular.module('hpsa-client')
.directive('hpPagination', function(){
       return{
           restrict: 'E',
           template: '<nav ng-if="pages.length >= 2"><ul class="pagination">' +
           '<li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
           '</ul></nav>',
           scope: {
               count: "=",
               relatedTable: "="
           },
           controller: function($scope){
               $scope.pages = [];

               $scope.$watch('count', function(){
                   $scope.pages = [];
                   for(var i = 1; i <= $scope.count; i++){
                       $scope.pages.push(i);
                   }
                   $scope.currentPage = 1;
               });

               $scope.selectPage = function(page){
                   if($scope.currentPage != page){
                       $scope.currentPage = page;
                       $scope.$emit('pageChanged', page);
                   }
               };
           }
       }
    });