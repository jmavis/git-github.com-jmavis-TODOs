(function() {
	var logLevels = {
		FULL: "FULL", // record all logs
		ERROR: "ERROR", // only record errors and warnings
		NONE: "NONE", // record nothing from this module
	}

	logTypes = {
		DEBUG: "DEBUG",
		WARNING: "WARNING",
		ERROR: "ERROR",
	}

	var recordFunctions = {};

	recordFunctions[logLevels.FULL] = function(name, log, type) {
		console.log(name + ": " + log);
	}

	recordFunctions[logLevels.ERROR] = function(name, logtype) {
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
