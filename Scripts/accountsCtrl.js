var accountsCtrl = function ($scope, $http, $location, $rootScope) {

    $scope.okButtonDisabled = false;

    $scope.showModalAccount = false;
    $scope.toggleModalAccount = function () {
        $scope.showModalAccount = !$scope.showModalAccount;
    };
    $scope.showModalOperation = false;
    $scope.toggleModalOperation = function (account) {
        console.log("toggling");
        $scope.account = account;
        $scope.showModalOperation = !$scope.showModalOperation;
    };

    $http.get("api/accounts").success(function (response) {
        $scope.accounts = response;
        //console.log(response);
    });

    $scope.confirmDeletion = function(account) {
        $scope.showModalConfirmation = true;
        $scope.accountToDelete = account;
    }

    $scope.hideConfirmation = function () {
        $scope.showModalConfirmation = false;
    }

    $scope.deleteAccount = function(account) {
        //console.log("Deleting [" + account.Id + "]");
        $http.delete("api/accounts/" + account.Id).success(function () {
            var index = $scope.accounts.indexOf(account);
            if (index > -1) {
                $scope.accounts.splice(index, 1);
            }
        }).then(function() {
            $scope.showModalConfirmation = false;
        });
    }

    $scope.createAccount = function (accountName) {
        if (accountName) {
            $scope.okButtonDisabled = true;
            $http.post("api/accounts/", accountName).success(function(response) {
                //console.log(response);
                $scope.accounts.push(response);
                $scope.showModalAccount = false;
            })
            .then(function() {
                $scope.okButtonDisabled = false;
            });
        }
    }

    findById = function (source, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i].id === id) {
                return source[i];
            }
        }
    }

    $scope.createOperation = function (amount, account) {
        if (amount) {
            $scope.okButtonDisabled = true;
            $http.post("api/operations", { Amount: amount, AccountId: account.Id }).success(function (response, status) {
                if (response) {
                    for (var i = 0; i < $scope.accounts.length; i++) {
                        if ($scope.accounts[i].Id === response.Account.Id) {
                            $scope.accounts[i] = response.Account;
                            break;
                        }
                    }
                } else {
                }
                $scope.amount = 0;
                $scope.toggleModalOperation();
            }).error(function (data, status) {
                if (status == 410) {
                    var index = $scope.accounts.indexOf(account);
                    if (index > -1) {
                        $scope.accounts.splice(index, 1);
                    }
                }
                $scope.toggleModalOperation();
            })
            .then(function() {
                $scope.okButtonDisabled = false;
            });
        }
    };
}