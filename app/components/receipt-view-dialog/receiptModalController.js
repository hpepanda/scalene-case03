angular.module('hpsa-client')
    .controller('ReceiptModalCtrl', function($scope, $modalInstance, model, ExpensesService, ReceiptUploader){
        $scope.expense = model.expense;

        $scope.uploadReceiptForm = {};
        $scope.receiptRaw = {};
        $scope.receiptImg = $scope.expense.receipt;
        $scope.serverErrorOccured = false;

        $scope.$watch('receiptRaw', function(){
            if($scope.receiptRaw && $scope.receiptRaw.data){
                $scope.receiptImg = $scope.receiptRaw.data;
            }
        });

        $scope.save = function(){
            if($scope.receiptRaw.data){
                ReceiptUploader.upload($scope.receiptRaw)
                    .success(function(data){
                        $scope.expense.receipt = data.imageUri;
                    })
                    .error(function(data){
                        $scope.serverErrorOccured = true;
                        console.log("sending img failed");
                    })
                    .then(function(){
                        return ExpensesService.save($scope.expense);
                    }).then(function(){
                        console.log("save receipt succeed");
                        $scope.serverErrorOccured = false;
                        $modalInstance.close();
                    }, function(error){
                        $scope.serverErrorOccured = true;
                        console.log("save receipt failed");
                    });
            }
            else{
                $modalInstance.close();
            }
        };

        $scope.close = function(){
            $modalInstance.close();
        };
    });