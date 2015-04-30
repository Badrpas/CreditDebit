var operationsCtrl = function ($scope, $routeParams, $http, $document) {
    $scope.totalValue = 0;
    var accountId = $routeParams.accountId;

    $http.get("api/operations/" + accountId).success(function (response) {
        $scope.operations = response;
    });
    $http.get("api/accounts/" + accountId).success(function (response) {
        $scope.account = response;
    });


    $scope.showModalOperation = false;
    $scope.toggleModalOperation = function () {
        $scope.showModalOperation = !$scope.showModalOperation;
    };

    $scope.sprintf = sprintf;
    $scope.addButtonDisabled = false;
    $scope.createOperation = function (amount) {
        console.log($scope.amount);
        if (amount) {
            $scope.addButtonDisabled = true;
            $http.post("api/operations", { Amount: amount, AccountId: accountId }).success(function (response, status) {
                if (response) {
                    $scope.operations.push(response);
                    $scope.account = response.Account;
                    $scope.amount = 0;
                } else {
                }
                $scope.showModalOperation = false;
            }).error(function(data, status) {
                if (status == 410) {
                    // Account was deleted
                    $scope.account = null;
                }
            }).then(function() {
                $scope.addButtonDisabled = false;
            });
        }
    };

}