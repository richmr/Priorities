// Global variable declarations

var portfolios = {};
var people = {};

var priorityChips = { "priority-chip1": { "projectID":"0", "blank":"0"},
							"priority-chip2": { "projectID":"0", "blank":"0"},
							"priority-chip3": { "projectID":"0", "blank":"0"},
							"priority-chip4": { "projectID":"0", "blank":"0"},
							"priority-chip5": { "projectID":"0", "blank":"0"},
							"priority-chip6": { "projectID":"0", "blank":"0"},
							"priority-chip7": { "projectID":"0", "blank":"0"},
							"priority-chip8": { "projectID":"0", "blank":"0"},
							"priority-chipStage" : {"projectID":"stage", "blank":"stage"}
						};
var archivedProjects = [];
var doneProjects = [];
var graveyardProjects = [];

								
var projects = { "0": {"title":" ", "status":"chip-placeholder", "draggable":false, "droppable":true, "click":"none"},
						"stage": {"title":"Click to add project", "status":"chip-black", "draggable":false, "droppable":false, "click":"add"}
					};

function consolidateData() {
	// Returns a consolidated JSON object with all data
	var allData = {};
	allData["portfolios"] = portfolios;
	allData["people"] = people;
	allData["priorityChips"] = priorityChips;
	allData["archivedProjects"] = archivedProjects;
	allData["doneProjects"] = doneProjects;
	allData["graveyardProjects"] = graveyardProjects;
	allData["projects"] = projects;
	
	return allData;
}

console.log("Global vars loaded.");