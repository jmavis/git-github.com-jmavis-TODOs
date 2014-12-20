(function() {
	logTypes = {
		DEBUG: 3,
		WARNING: 2,
		ERROR: 1,
		NONE: 0,
	}

	var currentLogs = {
		"app": logTypes.DEBUG,
		"TodosController": logTypes.DEBUG,
	}

	window.loggerInstance = function(name) {
		var logLevel = _.isNumber(currentLogs[name]) ? currentLogs[name] : logTypes.DEBUG;
		var type = logLevel
		var recordLog = function(log) {
			console.log(name + ": " + log);
		}
		return {
			d: logLevel >= logTypes.DEBUG ? function(message) {
				recordLog("DEBUG: " + message);
			} : function(){},
			w: logLevel >= logTypes.WARNING ? function(message) {
				recordLog("WARNING: " + message);
			} : function(){},
			e: logLevel >= logTypes.ERROR ? function(message) {
				recordLog("ERROR: " + message);
			} : function(){},
		};
	}
})()
