(function() {
	var logLevels = {
		FULL: "FULL",
		ERROR: "ERROR",
		NONE: "NONE",
	}

	var recordFunctions = {};

	recordFunctions[logLevels.FULL] = function(log) {
		console.log(log);
	}

	recordFunctions[logLevels.ERROR] = function(log) {
		console.log(log);
	}

	recordFunctions[logLevels.NONE] = function() {}


	var currentLogs = {
		"app": logLevels.FULL,
		"TodosController": logLevels.FULL,
	}

	window.loggerInstance = function(name) {
		var recordFunction = recordFunctions[currentLogs[name]] || function(){};

		return {
			record: recordFunction,
		};
	}
})()
