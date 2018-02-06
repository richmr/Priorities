// Edit project global vars
var editProjectID;
var editNewProject = false;

function initializeEditProject() {
	// Set up the date picker
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 5, // Creates a dropdown of 15 years to control year,
	    today: 'Today',
	    clear: 'Clear',
	    close: 'Ok',
	    closeOnSelect: true // Close upon selecting a date,
  });
  
  // Activate buttons:
  $("#addANote").unbind("click");
	$("#addANote").click(function(event) {
		clickaddANote();		
	});
	
	$("#saveProjectData").unbind("click");
	$("#saveProjectData").click(function(event) {
		clicksaveProjectData();		
	});
	
	$("#cancelProjectData").unbind("click");
	$("#cancelProjectData").click(function(event) {
		clickcancelProjectData();		
	});
	
	$("#cancelProjectNotes").unbind("click");
	$("#cancelProjectNotes").click(function(event) {
		clickcancelProjectNotes();		
	});
	
	$("#saveProjectNotes").unbind("click");
	$("#saveProjectNotes").click(function(event) {
		clicksaveProjectNotes();		
	});
	
  // open the modal - this was for testing and design
  $("#editProjectModal").modal("open");
}

function clickaddANote() {
	// Set the note to current data
	$("#projectNoteField").val(projects[editProjectID]["note"]);
	
	// open the modal - this was for testing and design
  $("#addANoteModal").modal("open");	
}

function clicksaveProjectData() {
	// open the modal - this was for testing and design
  $("#editProjectModal").modal("close");	
	
	// Set the note to current data	
}

function clickcancelProjectData() {
	// By design, no changes are made to the actual underlying data until "save" is clicked.
	// So just close the modal.
  $("#editProjectModal").modal("close");
  
  // The only caveat to that is if this were a new project.. Maybe not.  	
}

function clickcancelProjectNotes() {
	// By design, no changes are made to the actual underlying data until "save" is clicked.
	// So just close the modal.
  $("#editProjectModal").modal("close");
}

function clicksaveProjectNotes() {
	  projects[editProjectID]["note"] = $("#projectNoteField").val();
  $("#addANoteModal").modal("close");	
}

function editProject(projID, newProject=false) {
	// Set the global variable
	editProjectID = projID;
	editNewProject = newProject;	
	
	// Opens the modal with the data for this project
	var title = "";
	var goal = "";
	var status = "chip-status-green";
	var tasks = [];
	var note="";
	// Is this a new project?  Set text accordingly
	if (newProject) {
		$("#newOrEditProject").text("New");
	} else {
		$("#newOrEditProject").text("Edit");
		var proj = projects[projID];
		title = proj["title"];
		status = proj["status"];
		goal = proj["goal"];
		tasks = proj["tasks"];
		note = proj["note"];
	}
	
	// Set basic data
	$("#editProject-Title").val(title);
	$("#editProject-goal").val(goal);
	
	if (status=="chip-status-green") {
		$("#status-green").prop("checked", true);	
	} else if (status=="chip-status-yellow") {
		$("#status-yellow").prop("checked", true);	
	} else if (status=="chip-status-red") {
		$("#status-red").prop("checked", true);	
	}
	
	// iterate over tasks
	// First set task list to empty list
	$("#editProject-TaskList").html(addTaskButtonHTML());
	
	// Activate the button
	$("#editProject-addTaskButton").unbind("click");
	$("#editProject-addTaskButton").click(function(event) {
		clickaddTaskButton();		
	});
	
	// Set the "next task ID" data
	$("#editProject-TaskList").data("nextTaskID", 1);
	
	// Iterate
	$.each(tasks, function( index, value ) {
		  addTaskRow(value);
	});
	 
	 // Set the note data
	 $("#projectNoteField").val(note);
	 
	 // Open the modal
	 $("#editProjectModal").modal("open");
}

function addTaskButtonHTML() {
	// Returns the html for the addTaskButton
	var htmlstring = '<div class="row" id="editProject-taskListEnd">' +
  							'<a class="waves-effect" href="#!">' +
							'<i id="editProject-addTaskButton" class="small material-icons">add_circle_outline</i>' +
							'</a></div>';
	return htmlstring;
}

function newTaskHeaderHTML(taskID) {
	return '<div id="task-'+taskID+'" class="row valign-wrapper">';
}

function newTaskWho(taskID, who=false) {
	var htmlstring = '<div class="input-field col s2">';
	if (who) {
		htmlstring += '<input placeholder="Who" id="task-'+taskID+'-who" type="text" value="'+who+'">';
	} else {
		htmlstring += '<input placeholder="Who" id="task-'+taskID+'-who" type="text">';
	}
	htmlstring += '</div>';
	return htmlstring;
}

function newTaskWhat(taskID, what=false) {
	var htmlstring = '<div class="input-field col s5">';
	if (who) {
		htmlstring += '<input placeholder="What" id="task-'+taskID+'-what" type="text" value="'+what+'">';
	} else {
		htmlstring += '<input placeholder="What" id="task-'+taskID+'-What" type="text">';
	}
	htmlstring += '</div>';
	return htmlstring;
}

function newTaskWhen(taskID, when=false) {
	var htmlstring = '<div class="input-field col s3">';
	if (who) {
		htmlstring += '<input placeholder="When" id="task-'+taskID+'-when" type="text" value="'+when+'">';
	} else {
		htmlstring += '<input placeholder="When" id="task-'+taskID+'-when" type="text">';
	}
	htmlstring += '</div>';
	return htmlstring;
}

function newTaskDone(taskID, done=false) {
	var htmlstring = '<div class="col s1">';
	htmlstring += '<input type="checkbox" class="filled-in" id="task-'+taskID+'-done">';
	htmlstring += '<label for="task-'+taskID+'-done"> </label>'
	htmlstring += '</div>';
	return htmlstring;
}

function newTaskFooter(taskID) {
	return '</div>';
}

function addTaskRow(taskObj = false) {
	// Adds a task row, with task data if present
	var taskID = $("#editProject-TaskList").data("nextTaskID");	
	var htmlstring = newTaskHeaderHTML(taskID);
	var who, what, when;
	if (taskObj) {
		who = taskObj["Who"];
		what = taskObj["What"];
		when = taskObj["When"];		
	}
	
	htmlstring += newTaskWho(taskID, who);
	htmlstring += newTaskWhat(taskID, what);
	htmlstring += newTaskWhen(taskID, when);
	htmlstring += newTaskDone(taskID);
	htmlstring += newTaskFooter(taskID);
	
	$("#editProject-taskListEnd").before(htmlstring);
	
	// increment the nextTaskID
	$("#editProject-TaskList").data("nextTaskID", taskID+1);
}

function clickaddTaskButton() {
	addTaskRow();
}