var keyGlobalVars = [
	"portfolios",
	"priorityRowData",
	"people",
	"priorityChips",
	"archivedProjects",
	"doneProjects",
	"graveyardProjects",
	"projects"
	];

var lastKnownState = {};

function dataChanged(hint=false) {
	// Called whenever an important piece of data is changed
	// If there is a hint, then only worries about the data in the hint
	// If not iterates over chosen global variables and looks for any that changed
	// Then calls the data change handler to deal with the detected change	
	
	if (hint) {
		saveData(hint);
	} else {
		$.each(keyGlobalVars, function (key, aGlobalVar) {
			if (_.isEqual(window[aGlobalVar], lastKnownState[aGlobalVar])) {
				// This variable didn't change, don't do anything
			} else {
				// This variable did change, do something
				lastKnownState[aGlobalVar] = window[aGlobalVar];
				saveData(aGlobalVar);
			}		
		}
	}	
}

function saveData(objToSave) {
	// Just storing in localStorage for now.	
	localStorage.setItem(objToSave, JSON.stringify(window[objToSave]);
}

