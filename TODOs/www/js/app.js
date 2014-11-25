(function(){
	var app = angular.module("todos", []);

	app.controller("TodosController", function() {
		console.log("ran");
		this.todo = "Hello world";
	});
})();