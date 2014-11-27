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
		this.todos.push(new todo("Todo 1", new Date()));
		this.todos.push(new todo("Todo 2", new Date()));
	});

	app.controller("TodoController", function() {
		this.toggleEdit = function() {
			// this.find("textarea").focus();
		}
	});

	app.controller("AddTodoController", function() {
		this.todo = new todo("", new Date());

		this.addTodo = function(todosController) {
			todosController.push(this.todo);
			this.todo = new todo("", new Date());
		}
	});
})();