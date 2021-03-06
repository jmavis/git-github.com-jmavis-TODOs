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
			selected: false,
			createdDate: new Date(),
			version: 1,
		}
	}

	app.controller("CategoryController", function() {
		var logger = loggerInstance("CategoryController");

		function loadcategories() {
			var storedcategories;

			try {
				storedcategories = angular.fromJson(window.localStorage.getItem(window.storageConstants.CATEGORIES_KEY));
			} catch (e) {
				logger.e("could not parse categories because " + e);
			}

			if (!storedcategories || storedcategories.length === 0) { // for debugging
				storedcategories.push(new category("cat 1"));
				storedcategories.push(new category("cat 2"));
			}

			if (!storedcategories) return [];
			else return storedcategories;
		}

		function saveCategories(categoriesToStore) {
			window.localStorage.setItem(window.storageConstants.CATEGORIES_KEY, angular.toJson(categoriesToStore));
		}

		this.categories = loadcategories();
		window.cats = this.categories;
		this.currentCategory = _.find(this.categories, {selected: true}) || this.categories[0];

		this.save = function() {
			saveCategories(this.categories);
		}

		this.addTodo = function(todo){
			logger.d("adding " + todo.id);
			this.currentCategory.todos.push(todo);
			
			this.save();
		}

		this.removeTodo = function(todoId) {
			logger.d("removing " + todoId);
			this.currentCategory.todos = _.reject(this.categories.todos, {id:todoId});
			this.save();
		}

		this.changeCurrent = function(newCategory) {
			if (newCategory.id === this.currentCategory.id) {
				logger.d("Already on " + newCategory.id)
			} else {
				logger.d("Changing current to " + newCategory.id)
				this.currentCategory = newCategory;
				this.currentCategory.selected = true;
				this.save();
			}
		} 
	});

	app.controller("AddTodoController", function() {
		this.todo = new todo("", new Date());

		this.addTodo = function(categoryController) {
			if (this.todo.name.length === 0) {
				alert("Enter some text");
			} else {
				categoryController.addTodo(this.todo);
				this.todo = new todo("", new Date());
			}
		}
	});
})();