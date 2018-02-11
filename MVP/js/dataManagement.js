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

var savedDataFlag = "prioritiesDataSaved";

var lastKnownState = {};

function dataChanged(hint=false) {
	// Called whenever an important piece of data is changed
	// If there is a hint, then only worries about the data in the hint
	// If not iterates over chosen global variables and looks for any that changed
	// Then calls the data change handler to deal with the detected change	
	console.log("//dataChanged() called");	
	
	if (hint) {
		saveData(hint);
	} else {
		$.each(keyGlobalVars, function (key, aGlobalVar) {
			if (_.isEqual(window[aGlobalVar], lastKnownState[aGlobalVar])) {
				// This variable didn't change, don't do anything
				console.log(aGlobalVar+" did not change");
			} else {
				// This variable did change, do something
				lastKnownState[aGlobalVar] = window[aGlobalVar];
				console.log(aGlobalVar+" DID change");
				saveData(aGlobalVar);
			}		
		});
	}	
}

function saveAllData() {
	$.each(keyGlobalVars, function (key, aGlobalVar) {
		saveData(aGlobalVar);
	});
	localStorage.setItem(savedDataFlag, true);
}

function saveData(objToSave) {
	// Just storing in localStorage for now.	
	localStorage.setItem(objToSave, JSON.stringify(window[objToSave]));
	lastKnownState[objToSave] = window[objToSave];
}

function loadData(objToLoad, isJSON = true) {
	var obj = localStorage.getItem(objToLoad);
	if (isJSON) {
		obj = JSON.parse(obj);
	}
	lastKnownState[objToLoad] = obj;
	window[objToLoad] = obj;
}

function loadAllData() {
	$.each(keyGlobalVars, function (key, aGlobalVar) {
		loadData(aGlobalVar);
	});
}

function makeAllDataJSON() {
	var allData = {};
	$.each(keyGlobalVars, function (key, aGlobalVar) {
		allData[aGlobalVar] = window[aGlobalVar];
	});
	
	return allData;
}

function wasDataSaved() {
	if (localStorage.getItem(savedDataFlag)) {
		return true;
	} else {
		return false;
	}
}
