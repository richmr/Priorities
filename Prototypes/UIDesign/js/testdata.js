// Establish the data.
var priorityChips = { "priority-chip1": { "projectID":"1", "blank":"0"},
								"priority-chip2": { "projectID":"2", "blank":"0"},
								"priority-chip3": { "projectID":"3", "blank":"0"},
								"priority-chip4": { "projectID":"4", "blank":"0"},
								"priority-chip5": { "projectID":"5", "blank":"0"},
								"priority-chip6": { "projectID":"6", "blank":"0"},
								"priority-chip7": { "projectID":"7", "blank":"0"},
								"priority-chip8": { "projectID":"0", "blank":"0"},
								"priority-chipStage" : {"projectID":"stage", "blank":"stage"}
							};
var archivedProjects = ["15", "20"];
var doneProjects = [];
var graveyardProjects = [];

								
var projects = { "0": {"title":" ", "status":"chip-placeholder", "draggable":false, "droppable":true, "click":"none"},
						"1": {"title":"Extreme 1", "status":"chip-status-red", "draggable":true, "droppable":false, "click":"details"},
						"2": {"title":"Extreme 2", "status":"chip-status-green", "draggable":true, "droppable":false, "click":"details"},
						"3": {"title":"High 1", "status":"chip-status-yellow", "draggable":true, "droppable":false, "click":"details"},
						"4": {"title":"High 2", "status":"chip-status-green", "draggable":true, "droppable":false, "click":"details"},
						"5": {"title":"Medium 1", "status":"chip-status-green", "draggable":true, "droppable":false, "click":"details"},
						"6": {"title":"Really Long Medium 2", "status":"chip-status-red", "draggable":true, "droppable":false, "click":"details"},
						"7": {"title":"Low 1", "status":"chip-status-red", "draggable":true, "droppable":false, "click":"details"},
						"8": {"title":"Stored 1", "status":"chip-status-red", "draggable":true, "droppable":false, "click":"details"},
						"15": {"title":"Archived 1", "status":"chip-status-red", "draggable":true, "droppable":false, "click":"details"},
						"20": {"title":"Archived Too", "status":"chip-status-red", "draggable":true, "droppable":false, "click":"details"},
						"stage": {"title":"Click to add project", "status":"chip-black", "draggable":false, "droppable":false, "click":"add"}
					};

console.log("Test data loaded.");