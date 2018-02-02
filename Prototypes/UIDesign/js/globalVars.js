// Global variable declarations

var portfolios = {"name":"Click to Change"};
var priorityRowData = { "categories":["Extreme", "High", "Med", "Low"],
								"rows":{"1":{"name":"Click to Change", "slots":2}}
							};
var people = {};

var priorityChips = { "priority-row-1-spot-1": { "projectID":"0", "blank":"0"},
							"priority-row-1-spot-2": { "projectID":"0", "blank":"0"},
							"priority-row-1-spot-3": { "projectID":"0", "blank":"0"},
							"priority-row-1-spot-4": { "projectID":"0", "blank":"0"},
							"priority-row-1-spot-5": { "projectID":"0", "blank":"0"},
							"priority-row-1-spot-6": { "projectID":"0", "blank":"0"},
							"priority-row-1-spot-7": { "projectID":"0", "blank":"0"},
							"priority-row-1-spot-8": { "projectID":"0", "blank":"0"},
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
	// First update the pools
	saveArchive();
	saveGraveyard();
	saveDone();
	
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