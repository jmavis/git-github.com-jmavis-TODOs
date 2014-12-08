(function() {
	var logLevels = {
		FULL: "FULL", // record all logs
		ERROR: "ERROR", // only record errors and warnings
		NONE: "NONE", // record nothing from this module
	}

	var recordFunctions = {};

	recordFunctions[logLevels.FULL] = function(name, log) {
		console.log(name + ": " + log);
	}

	recordFunctions[logLevels.ERROR] = function(name, log) {
		console.log(name + ": " + log);
	}

	recordFunctions[logLevels.NONE] = function() {}

	var currentLogs = {
		"app": logLevels.FULL,
		"TodosController": logLevels.FULL,
	}

	window.loggerInstance = function(name) {
		var recordFunction = recordFunctions[currentLogs[name]] || function(){};

		return {
			record: function(message){
				recordFunction(name, message);
			},
		};
	}
})()
