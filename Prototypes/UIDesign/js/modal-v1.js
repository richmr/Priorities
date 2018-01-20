// Object.keys(projects).length (save for later)

console.log("Dynamic chips v4 activated.");

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

function updatePriorityChip( chip ) {
	// This will update the chip with the most recent data
	// I assume all chips have been marked as draggable and droppable already
	
	var projID = priorityChips[chip.id].projectID;
	//$(chip).attr("id")].projectID;
	var thisProj = projects[projID];
	
	// Remove all current classes
	$(chip).removeClass("chip-placeholder chip-status-red chip-status-green chip-status-yellow");
	
	// Add the requisite class
	$(chip).addClass(thisProj.status);
	
	// Set the title
	$(chip).text(thisProj.title);
	
	// Set attributes
	if (thisProj.draggable) {
		$(chip).draggable("enable");
	} else {
		$(chip).draggable("disable");
	}
	
	if (thisProj.droppable) {
		$(chip).droppable("enable");
	} else {
		$(chip).droppable("disable");
	}
	
	if (thisProj.click == "details") {
		$(chip).unbind("click");
		$(chip).click(function(event) {
			clickChip( event.target );		
		});
	} else if (thisProj.click == "add") {
		$(chip).unbind("click");
		$(chip).click(function(event) {
			clickChip( event.target );		
		});
	} else if (thisProj.click == "none") {
		$(chip).unbind("click");
	}
}

function clickChip( chip ) {
	console.log(`id: ${chip.id} clicked`);
}

$(function() {
	$('div[id^="priority"]' ).draggable({
		disabled: true,
      helper: "clone",
      revert: "invalid",
      start: function( event, ui ) {
      	// Store original project number in two places
      	$(this).data("originalProjNum", priorityChips[$(this).attr("id")].projectID);
      	$(ui.helper).data("originalProjNum", priorityChips[$(this).attr("id")].projectID);
      	// Set projectID = 0
      	priorityChips[$(this).attr("id")].projectID = priorityChips[$(this).attr("id")].blank;
      	// Reset format
      	$(this).removeClass("chip-black chip-status-red chip-status-green chip-status-yellow");
			$(this).text(" ");
			$(this).addClass("chip-placeholder");
			// Set revert flag to make sure we know where it goes
			$(ui.helper).data("revert", true);
		},
		stop: function( event, ui ) {
			console.log("the drag stopped");
			if ($(ui.helper).data("revert")) {
				console.log("I returned home");
				// Reset the project number
				priorityChips[$(this).attr("id")].projectID = $(this).data("originalProjNum");
				// Reset the chip
				updatePriorityChip(this);
			} else {
				console.log("I landed somewhere else");
				updatePriorityChip(this);	
			}	
		}
    });
    $('div[id^="priority"]' ).droppable({
      over: function( event, ui ) {
			//$(this).text("Left behind");
		},
		drop: function( event, ui ) {
			//$(this).text("Left behind");
			console.log("something dropped on a priority chip");
			
			// Tag the helper to make sure it knows it landed somewhere else
			$(ui.helper).data("revert", false);

			// Set this droppable to the new project number
			priorityChips[$(this).attr("id")].projectID = $(ui.helper).data("originalProjNum");
			
			// Update the chip
			updatePriorityChip(this);
		}
    });
    // Now establish the actual chip values
	$('div[id^="priority"]' ).each(function( index ) {
		console.log("Setting up a chip");
	  	updatePriorityChip(this);
	});
});



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

function initializeArchive() {
	// Loop over the archivedProjects array
	archivedProjects.forEach(function (item, index, array) {
		addChipToArchive(item);
	});
}	


function addChipToArchive( projectID ) {	
	// Returns TRUE when the function completes correctly	
	// Add project to archivedProjects - Maybe not, maybe just store in the html
	
	// Prepend html to archivePool
	var title = projects[projectID].title;
	var newID = "archivePool-" + ($('div[id^="archivePool-"]').length + 1);
	
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
	
	// Remove html from archivePool
	//$(chipDOM).remove();
	
	// Close the modal
	//$("#archiveModal").modal('close');
	
	//$("#priority-chipStage").toggleClass("pulse");
		
}

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();    
    $("#archive").click(function(event) {
			clickOnArchive();		
		});
    initializeArchive();
  });
