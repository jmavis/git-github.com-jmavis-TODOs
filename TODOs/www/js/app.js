(function(){
	var app = angular.module("todos", []);

	function todo(name, dueDate) {
		return {
			name: name,
			dueDate: dueDate,
			editing: false,
			version: 1, // for comparision in future versions in case data changes
		}
	}

	app.controller("TodosController", function() {
		function loadTodos() {
			var storedTodos;

			try {
				storedTodos = angular.fromJson(window.localStorage.getItem(window.storageConstants.TODOS_KEY));
			} catch (e) {
				console.log("could not parse todos because " + e);
			}

			if (!storedTodos) return [];
			else return storedTodos;
		}

		function storeTodos(todosToStore) {
			window.localStorage.setItem(window.storageConstants.TODOS_KEY, angular.toJson(todosToStore));
		}

		this.todos = loadTodos();

		this.addTodo = function(todo){
			this.todos.push(todo);
			storeTodos(this.todos);
		}
	});

	app.controller("TodoController", function() {
		this.toggleEdit = function() {
			// this.find("textarea").focus();
		}
	});

	app.controller("AddTodoController", function() {
		this.todo = new todo("", new Date());

		this.addTodo = function(todosController) {
			todosController.addTodo(this.todo);
			this.todo = new todo("", new Date());
		}
	});
})();