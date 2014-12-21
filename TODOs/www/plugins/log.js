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
		var recordLog = function(log, color) {
			console.log("%c" + name + ": " + log, "color:" + color);
		}
		return {
			d: logLevel >= logTypes.DEBUG ? function(message) {
				recordLog("DEBUG: " + message, "black");
			} : function(){},
			w: logLevel >= logTypes.WARNING ? function(message) {
				recordLog("WARNING: " + message, "yellow");
			} : function(){},
			e: logLevel >= logTypes.ERROR ? function(message) {
				recordLog("ERROR: " + message, "red");
			} : function(){},
		};
	}
})()