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
  
  
  // open the modal - this was for testing and design
  $("#editProjectModal").modal("open");
}

function editProject(projID, newProject=false) {
	// Opens the modal with the data for this project
	var title = "";
	var goal = "";
	var status = "chip-status-green";
	var tasks = [];
	// Is this a new project?  Set text accordingly
	if (newProject) {
		$("#newOrEditProject").text("New");
	} else {
		$("#newOrEditProject").text("Edit");
		var proj = projects[projID];
		title = proj["title"];
		status = proj["status"];
		tasks = proj["tasks"];
	}
	
	// Set the project title
}