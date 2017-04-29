angular.module('SAT')
.config(function($routeProvider){
	$routeProvider
    .when("/", {
        templateUrl : "view/tabs.html",
        controller: "tabscontroller"
        
    })
    ;
});

