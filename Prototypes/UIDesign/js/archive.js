$( "#archive").droppable({
	drop: function( event, ui ) {
     console.log("Something was dropped on the archive");
		// Hide the item
		ui.helper.hide();
		ui.helper.data("revert", false);
				
		// Connect it to the archive sortable
		var projID = $(ui.helper).data("originalProjNum");
		addChipToArchive(projID);
		
		// Make the archive icon do something interesting.
		$("#archive").animate({
			color: "green"
		});
		$("#archive").animate({
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

$("#archive").click(function(event) {
		clickOnArchive();		
	});

function initializeArchive() {
	// Loop over the archivedProjects array
	archivedProjects.forEach(function (item, index, array) {
		addChipToArchive(item);
	});
}	


function addChipToArchive( projectID ) {	
	// Returns TRUE when the function completes correctly	
	// Add project to archivedProjects - Not done to prevent a lot of array searching and splitting
	// Instead on "Save" the data must be pulled directly from the DOM 
	
	// Prepend html to archivePool
	var title = projects[projectID].title;
	var newCount = ($('div[id^="archivePool-"]').length + 1);
	var newID = "archivePool-" + newCount;
	
	// Reset the chip status to green.  If you put a project in idle, then no fault for not working on it
	projects[projectID].status = "chip-status-green"
	
	var htmlSnippet = `<div id="${newID}" class="chip">${title}</div>`;
	$("#archivePool").prepend(htmlSnippet);
	
	// Set info for this chip
	$("#"+newID).data("projectID", projectID);
	
	// Set action attributes
	$("#"+newID).click(function (event) {
		clickOnArchivedChip(event.target);
	});
	
	$("#"+newID).disableSelection();
	
	// Set the count text
	$("#archive-count").text(newCount);
	
	// return true 
	return true;
}

function clickOnArchive () {
	// Check to see if a chip is already sitting on the stage
	// If so, rearchive it.
	var projID = priorityChips["priority-chipStage"].projectID;
	if (projID != "stage") {
		addChipToArchive(projID);
		priorityChips["priority-chipStage"].projectID = "stage";
		updatePriorityChip($("#priority-chipStage")[0]);
	}
	// Open the modal
	$("#archiveModal").modal('open');
}

function clickOnArchivedChip ( chipDOM ) {
	// Set up chipStage
	var projID = $(chipDOM).data("projectID");
	priorityChips["priority-chipStage"].projectID = projID;
	// Remove this from archivedProjects
	// not necessary, this is only saved on exit
	
	// Get the position of the staging chip
	//var stageoffset = $("#priority-chipStage").offset();
	//stageoffset["position"]="absolute";
	// Get the position of the top right corner of the modal
	var topright = $("#archiveModal-header").position();
	topright.left = topright.left + $("#archiveModal-content").width() - $(chipDOM).width() - $(chipDOM).position().left;
	topright.top = topright.top - $(chipDOM).position().top;
	
	// Send the chip there?
	$(chipDOM).draggable();
	$(chipDOM).animate(topright ,250, "linear", function() { $(chipDOM).remove(); updatePriorityChip($("#priority-chipStage")[0]);
	$("#archiveModal").modal('close');});
	
	// Reset the counter
	var newCount = ($('div[id^="archivePool-"]').length-1);
	// Set the count text
	$("#archive-count").text(newCount);
		
}

function saveArchive() {
	// Will populate the archivedProjects global var with the projectIDs
	archivedProjects=[];
	$('div[id^="archivePool-"]').each( function (index) {
		archivedProjects.push($(this).data("projectID"));
	});
}
	


console.log("archive loaded");