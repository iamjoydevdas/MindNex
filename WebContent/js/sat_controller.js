angular.module("SAT").controller('tabscontroller',['$rootScope','$scope','$timeout', function($rootScope, $scope, $timeout){
	$scope.tabs={};
	$scope.tabs.tab="Template";
	$rootScope.message = '';
	
	$rootScope.$watch('message', function(newVal, oldVal){
		$rootScope.message = newVal;
		$timeout(function(){
			$('#alertId').modal('hide');
		},5000);
	});
	
	
	
}])
.controller('templateController',['$rootScope','$http','$scope','templateService', function($rootScope, $http, $scope, templateService){
	$scope.templateData='';
	//$scope.templateData= templateService.getTemplate();
	$scope.istemplate = true;
	$scope.templateId = "001";
	$scope.selectedId = '';
	
	$scope.nextTab = function(){
		console.log('hiiiiiiiiiiiiiiiiiiiiiiii');
		$rootScope.nextTab = 'Communication';
	};
	
	init();
	function init(){
		$http({
			method : 'GET',
			url : "http://localhost:8084/sat_service/rest/sat/getTemplates"			
		}).then(function myResponse(response){
			$scope.templateData = response.data;
		})
	};
	
	$scope.openModal = function(value,tempType){
		$scope.istemplate = tempType;
		$scope.templateId = value;
		$rootScope.$broadcast('chol:bhai:call:kor',$scope.templateId);
		$('#myModal').modal('show');
	};
	
	$scope.submit = function(){
		$rootScope.$broadcast('updateTemplate',false);
	}

}])

.controller('communicationController',['communicationService','$scope', function(communicationService,$scope){
	console.log('hii');
	$scope.communicationData= communicationService.getcommunication();
	console.log($scope.communicationData);
}])

.controller('employeeController',[ '$rootScope','employeeService', '$http','$scope', function($rootScope, employeeService,$http,$scope){
	$scope.empID='';
	$scope.empName='';
	$scope.dpt='';
	$scope.employeeList = [];
	
	$scope.$on('add-emp', function(event, args){
		 $http({
				method : "GET",
				url : "http://localhost:8084/sat_service/rest/sat/getEmployee"					
		}).then(function susscess(response){
			employeeService.setEmployees(response.data.data);
			$scope.employeeList = employeeService.getEmployees();
			$rootScope.message = 'Employee added successfully';
			$('#empModal').modal('hide');
			$('#alertId').modal('show');
		}).then(function fail(response){
			
		});
	});
	
	
	/*$scope.addEmp= function(){
		if($scope.empID!=''&& $scope.empName!='' && $scope.dpt!='')
			$http({
				method : "POST",
				url : "http://localhost:8084/sat_service/rest/sat/addEmployee",
				params : {
							'empID' : $scope.empID,
							'empName' : $scope.empName,
							'dpt' : $scope.dpt
				}
				
		}).then(function mySucces(response) {
	        console.log(response.data);
	        if(response.data.success){
		        $http({
						method : "GET",
						url : "http://localhost:8084/sat_service/rest/sat/getEmployee"					
				}).then(function susscess(response){
					employeeService.setEmployees(response.data.data);
					$scope.employeeList = employeeService.getEmployees();
				}).then(function fail(response){
					
				});
	        }
	    }, function myError(response) {
	        console.log(response.statusText);
	    })}*/
	;
	init();
	function init(){
		$http({
			method : "GET",
			url : "http://localhost:8084/sat_service/rest/sat/getEmployee"					
	}).then(function susscess(response){
		employeeService.setEmployees(response.data.data);
		$scope.employeeList = employeeService.getEmployees();
	}).then(function fail(response){
		
	});
	}
	
	
}]);
