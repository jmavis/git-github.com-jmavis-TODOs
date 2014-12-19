(function() {
	var logLevels = {
		FULL: "FULL", // record all logs
		ERROR: "ERROR", // only record errors and warnings
		NONE: "NONE", // record nothing from this module
	}

	logTypes = {
		DEBUG: 3,
		WARNING: 2,
		ERROR: 1,
	}

	var recordFunctions = {};

	recordFunctions[logLevels.FULL] = function(name, log, type) {
		console.log(name + ": " + log);
	}

	recordFunctions[logLevels.ERROR] = function(name, log, type) {
		if (log < logtTypes.WARNING) {
			console.log(name + ": " + log);
		}
	}

	recordFunctions[logLevels.NONE] = function() {}

	var currentLogs = {
		"app": logLevels.FULL,
		"TodosController": logLevels.FULL,
	}

	window.loggerInstance = function(name) {
		var recordFunction = recordFunctions[currentLogs[name]] || function(){};

		return {
			d: function(message) {

			},
			w: function(message) {

			},
			record: function(message){
				recordFunction(name, message);
			},
		};
	}
})()
