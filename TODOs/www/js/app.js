(function(){
	var app = angular.module("todos", []);

	app.controller("TodosController", function() {
		this.todos = ["Todo 1", "Todo 2"];
	});
})();