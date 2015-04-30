var app = angular.module("accountingApp", ["ngRoute", "sprintf"]);

app.config(function ($routeProvider ) {
    console.log("config");
    $routeProvider
        .when("/", {
            controller: "accountsCtrl",
            templateUrl: "/Templates/accounts.html"
        })
        .when("/operations/:accountId", {
            controller: "operationsCtrl",
            templateUrl: "/Templates/operations.html"
        })
        .when("", {
            redirectTo: "/"
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.controller("accountsCtrl", accountsCtrl);
app.controller("operationsCtrl", operationsCtrl);

app.directive("modal", modalDirective);