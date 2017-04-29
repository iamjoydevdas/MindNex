angular.module('SAT')
.directive('templateAndEmail', ['$http', function($http){
	return {
		retrict : 'EA',
		scope   : {
			email : '=',
			templateId : '='
		
		},
		link : function(scope, ele, attrs){
			scope.templateSub = '';
			scope.templateBody = '';
			scope.templateCrdt = '';
			scope.$on('chol:bhai:call:kor',function(evt,templateId){
				callTemplateDesc(templateId);
			});
			
			scope.$on('updateTemplate',function(evt,templateId){
				callUpdate();
			});
			
			function callTemplateDesc(templateId){
				if(templateId != ''){
					$http({
						method : "POST",
						url : "http://localhost:8084/sat_service/rest/sat/getTemplate",
						params : {
							'templateId' :  templateId
						}
					}).then(function myResponse(response){
						scope.templateSub = response.data.data[0].T_SUB;
						scope.templateBody = response.data.data[0].T_Body;
						scope.templateCrdt = response.data.data[0].T_CRTDT;
					}).then(function myError(response){
					})
				}
			};
			function callUpdate(){
				if(scope.templateId != ''){
					$http({
						method : "POST",
						url : "http://localhost:8084/sat_service/rest/sat/updateTemplate",
						params : {
							'templateId' :  scope.templateId,
							'templateSub' : scope.templateSub,
							'templateBody' : scope.templateBody,
							'tmpCrtDt' : new Date(scope.templateCrdt)
						}
					}).then(function myResponse(response){
						if(response.data.success){
							scope.msg = response.data.msg;
							$('#myModal').modal('hide');
							$('#alertId').modal('show');
							
						}
					}).then(function myError(response){
					})
				}
			}
		},
		templateUrl : './view/templateAndEmail.html',
	};
}])

.directive('addEmployee', ['$rootScope','$http', function($rootScope, $http){
	return {																			
		retrict : 'E',
		templateUrl : './view/addEmployee.html',
		scope : {
			empId : '=',
			empName : '=',
			dpt : '='
		},
		link : function(scope, ele, attrs){
			scope.addEmp =  function(){
				if(scope.empID!=''&& scope.empName!='' && scope.dpt!=''){
					$http({
							method : "POST",
							url : "http://localhost:8084/sat_service/rest/sat/addEmployee",
							params : {
										'empID' : scope.empId,
										'empName' : scope.empName,
										'dpt' : scope.dpt
							}
							
					}).then(function mySucces(response) {
						console.log(response.data);
				        if(response.data.success){
				        	$rootScope.$broadcast('add-emp');
				        }

					})
			}
			    
			}
		}
	};
}])

;