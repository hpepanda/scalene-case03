angular.module('hpsa-client')
.controller('NewExpenseCtrl', function($scope, $q, $modalInstance, model, ExpensesService, ReceiptUploader){
        $scope.expense = model.expense;
        $scope.isNew = model.isNew;

        $scope.title = model.isNew ? "New Expense" : "Edit Expense";
        $scope.categories = model.categories;
        $scope.datepicker = {
            opened: false
        };
        $scope.maxDate = new Date();
        $scope.receiptRaw = {};
        $scope.submitFailedMessage = "";

        $scope.$watchCollection('receiptRaw', function(){
            $scope.uploadCaption = $scope.receiptRaw.name || "Upload File";
        });

        var uploadImg = function(){
            var deferred = $q.defer();

            if(!$scope.receiptRaw.data){

                if(!$scope.expense.expenseId){
                    deferred.reject("Image required");
                }
                else{
                    deferred.resolve({});
                }
                return deferred.promise;
            }

            ReceiptUploader.upload($scope.receiptRaw)
                .success(function(data){
                    $scope.expense.receipt = data.imageUri;
                    deferred.resolve({});
                })
                .error(function(data){
                    console.log("sending img failed");
                    deferred.reject("[Image upload] Server error has occured");
                });
            return deferred.promise;

        };

        $scope.save = function(){
            uploadImg().
                then(function(){
                    return ExpensesService.save($scope.expense);
                }).
                then(function(){
                    console.log("save receipt succeed");
                    $modalInstance.close();
                }, function(error){
                    $scope.submitFailedMessage = error;
                    console.log("save expense failed");
                });
        };

        $scope.close = function(){
            $modalInstance.dismiss('cancel');
        };
    });