$( "#doneProjects").droppable({
	drop: function( event, ui ) {
     //console.log("Something was dropped on the doneProjects");
		// Hide the item
		ui.helper.hide();
		ui.helper.data("revert", false);
				
		// Connect it to the archive sortable
		var projID = $(ui.helper).data("originalProjNum");
		addChipTodoneProjects(projID);
		
		// Make the archive icon do something interesting.
		$("#doneProjects").animate({
			color: "green"
		});
		$("#doneProjects").animate({
			color: "black"
		});
   },
   over: function( event, ui ) {
		$(this).animate({
			color: "blue"
		});
	},
	out: function( event, ui ) {
		$(this).animate({
			color: "black"
		});
	},
	tolerance: "pointer"
});

$("#doneProjects").click(function(event) {
		clickOndoneProjects();		
	});

function initializedoneProjects() {
	// Loop over the archivedProjects array
	doneProjects.forEach(function (item, index, array) {
		addChipTodoneProjects(item);
	});
}	


function addChipTodoneProjects( projectID ) {	
	// Returns TRUE when the function completes correctly	
	// Add project to archivedProjects - Maybe not, maybe just store in the html
	
	// Prepend html to archivePool
	var title = projects[projectID].title;
	var newCount = ($('div[id^="doneProjectsPool-"]').length + 1);
	var newID = "doneProjectsPool-" + newCount;
	
	// Reset the chip status to green.  If you put a project in idle, then no fault for not working on it
	projects[projectID].status = "chip-status-green"
	
	var htmlSnippet = `<div id="${newID}" class="chip">${title}</div>`;
	$("#doneProjectsPool").prepend(htmlSnippet);
	
	// Set info for this chip
	$("#"+newID).data("projectID", projectID);
	
	// Set action attributes
	$("#"+newID).dblclick(function (event) {
		clickOndoneProjectsChip(event.target);
	});
	
	$("#"+newID).disableSelection();
	
	// Set the count text
	$("#doneProjects-count").text(newCount);
	
	// return true 
	return true;
}

function clickOndoneProjects () {
	// Check to see if a chip is already sitting on the stage
	// If so, rearchive it.
	var projID = priorityChips["priority-chipStage"].projectID;
	if (projID != "stage") {
		addChipToArchive(projID);
		priorityChips["priority-chipStage"].projectID = "stage";
		updatePriorityChip($("#priority-chipStage")[0]);
	}
	// Open the modal
	$("#doneProjectsModal").modal('open');
}

function clickOndoneProjectsChip ( chipDOM ) {
	// Set up chipStage
	var projID = $(chipDOM).data("projectID");
	priorityChips["priority-chipStage"].projectID = projID;
	// Remove this from archivedProjects
	// not necessary, this is only saved on exit
	
	// Get the position of the staging chip
	//var stageoffset = $("#priority-chipStage").offset();
	//stageoffset["position"]="absolute";
	// Get the position of the top right corner of the modal
	var topright = $("#doneProjectsModal-header").position();
	topright.left = topright.left + $("#doneProjectsModal-content").width() - $(chipDOM).width() - $(chipDOM).position().left;
	topright.top = topright.top - $(chipDOM).position().top;
	
	// Send the chip there?
	$(chipDOM).draggable();
	$(chipDOM).animate(topright ,250, "linear", function() { 
		$(chipDOM).remove();
		updatePriorityChip($("#priority-chipStage")[0]);
		$("#doneProjectsModal").modal('close');
	});
	
	// Reset the counter
	var newCount = ($('div[id^="doneProjectsPool-"]').length-1);
	// Set the count text
	$("#doneProjects-count").text(newCount);
			
}

function saveDone() {
	// Will populate the graveyardProjects global var with the projectIDs
	doneProjects=[];
	$('div[id^="doneProjectsPool-"]').each( function (index) {
		doneProjects.push($(this).data("projectID"));
	});
}

function clearDoneProjects() {
	// Non-recoverable delete of projects in done
	// Intended for use only on a data reset
	$('div[id^="doneProjectsPool"]').each(function( index ) {
		$(this).empty();
	});
}

//console.log("doneProjects loaded");