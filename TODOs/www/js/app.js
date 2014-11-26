(function(){
	var app = angular.module("todos", []);

	function todo(name, dueDate) {
		return {
			name: name,
			dueDate: dueDate,
			editing: false,
		}
	}

	app.controller("TodosController", function() {
		this.todos = [];
		this.todos.push(new todo("Todo 1", new Date().getTime() + 20000));
		this.todos.push(new todo("Todo 2", new Date().getTime() + 20000));
	});

	app.controller("TodoController", function() {
		this.toggleEdit = function() {
			// this.find("textarea").focus();
		}
	});
})();