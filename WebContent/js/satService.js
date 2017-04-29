angular.module('SAT').factory('templateService', function(){
	var app = this;
	var template = {};
	template.data = [{'templateId':'T1', 'TemplateName':'A'},{'templateId':'T2', 'TemplateName':'B'},
	                 {'templateId':'T3', 'TemplateName':'C'},{'templateId':'T4', 'TemplateName':'D'}];
	app.templateJson = template;
	app.getTemplate =  function(){
		return app.templateJson; 
	}	
	return app;
})

.factory('communicationService', function(){
	var app = this;
	var communication = {};
	communication.data = [{'communicationName':'N1', 'communicationDate':'D1', 'templateName':'t1','communicationUser':'U1'},{'communicationId':'T2', 'communicationName':'B'},
	                 {'communicationId':'T3', 'communicationName':'C'},{'communicationId':'T4', 'communicationName':'D'}];
	app.communicationJson = communication;
	app.getcommunication =  function(){
		return app.communicationJson; 
	}	
	return app;
})


.factory('employeeService', function(){
	var app = this;
	app.Employees = {};
	app.setEmployees = function(empList){
		app.Employees=empList;
		
	};
	
	app.getEmployees = function(){
		return app.Employees;
	}
	return app;
})
;
