(function(){
	var app = angular.module("todos", []);

	function getNewId() {
		var storedId = _.parseInt(window.localStorage.getItem(window.storageConstants.IDS_KEY)) || 0;
		window.localStorage.setItem(window.storageConstants.IDS_KEY, storedId+1);
		return storedId;
	}

	function category(name) {
		return {
			id: getNewId(),
		};
	}

	function todo(name, dueDate) {
		return {
			id: getNewId(),
			name: name,
			dueDate: dueDate,
			editing: false,
			createdDate: new Date(),
			version: 1, // for comparision in future versions in case data changes
		}
	}

	function category(name) {
		return {
			id: getNewId(), // TODO use a different id set than todos
			name: name,
			todos: [],
			createdDate: new Date(),
			version: 1,
		}
	}

	app.controller("AppController", function() {
		this.categories = ["Cat 1", "Cat 2", "Cat 3"];
	});


	app.controller("TodosController", function() {
		var logger = loggerInstance("TodosController");

		function loadTodos() {
			var storedTodos;

			try {
				storedTodos = angular.fromJson(window.localStorage.getItem(window.storageConstants.TODOS_KEY));
			} catch (e) {
				logger.e("could not parse todos because " + e);
			}

			if (!storedTodos) return [];
			else return storedTodos;
		}

		function storeTodos(todosToStore) {
			window.localStorage.setItem(window.storageConstants.TODOS_KEY, angular.toJson(todosToStore));
		}

		this.todos = loadTodos();
		window.todos = this.todos;

		this.addTodo = function(todo){
			logger.d("adding " + todo.id);
			this.todos.push(todo);
			
			this.save();
		}

		this.removeTodo = function(todoId) {
			logger.d("removing " + todoId);
			this.todos = _.reject(this.todos, {id:todoId});
			this.save();
		}

		this.save = function() {
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
			if (this.todo.name.length === 0) {
				alert("Enter some text");
			} else {
				todosController.addTodo(this.todo);
				this.todo = new todo("", new Date());
			}
		}
	});
})();