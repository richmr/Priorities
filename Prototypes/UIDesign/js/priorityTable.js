// Global var hack to track which chip is being edited
var chipBeingEdited;

function updatePriorityChip( chip ) {
	// This will update the chip with the most recent data
	// I assume all chips have been marked as draggable and droppable already
	
	// Check to see if this chip exists in the data
	var projID;
	if (priorityChips[chip.id]) {
		projID = priorityChips[chip.id].projectID;	
	} else {
		priorityChips[chip.id] = JSON.parse('{ "projectID":"0", "blank":"0"}');
		projID = 0;	
	}	
	
	// Check to see if the project exists
	var thisProj
	if (!(thisProj = projects[projID])) {
		//console.log("Project ID "+projID+" was not found, replaced with empty slot");
		priorityChips[chip.id].projectID = 0;
		thisProj = projects[0];
	} 	
	
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
		$(chip).off("dblclick");
		$(chip).dblclick(function(event) {
			editChip( event.target );		
		});
	} else if (thisProj.click == "add") {
		$(chip).off("click");
		$(chip).click(function(event) {
			newChip( event.target );		
		});
	} else if (thisProj.click == "none") {
		$(chip).off("dblclick");
	}
}

function editChip(chip) {
	chipBeingEdited = chip;
	editProject(priorityChips[chip.id].projectID);
}

function newChip(chip) {
	chipBeingEdited = chip;  
	editProject(projects["nextProjID"], true);  // true for newProject
}

function clickChip( chip ) {
	console.log(`id: ${chip.id} clicked`);
}

function clickOnRowName(chip) {
	var rowID = $(chip).data("rowID");
	
}

function initializeTableRow(rowID) {
	// Initialize the ability to click the name and set a data field on the name
	$("#row-"+rowID+"-name").click(function(event) {
			editTableRow(rowID);		
		}).data("rowID", rowID);
		
	
	// This initializes all the chips in a row on the table, setting all necessary handlers
	$('div[id^="priority-row-'+rowID+'"]' ).each(function( index ) {
		initializeTableChip(this);
	});
}

function initializeTableChip(chip) {
	// Initializes all of the handlers for a specific chip
	$(chip).draggable({
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
			//console.log("the drag stopped");
			if ($(ui.helper).data("revert")) {
				//console.log("I returned home");
				// Reset the project number
				priorityChips[$(this).attr("id")].projectID = $(this).data("originalProjNum");
				// Reset the chip
				updatePriorityChip(this);
			} else {
				//console.log("I landed somewhere else");
				updatePriorityChip(this);	
			}	
		}
    });
    $(chip).droppable({
      over: function( event, ui ) {
			//$(this).text("Left behind");
		},
		drop: function( event, ui ) {
			//$(this).text("Left behind");
			//console.log("something dropped on a priority chip");
			
			// Tag the helper to make sure it knows it landed somewhere else
			$(ui.helper).data("revert", false);

			// Set this droppable to the new project number
			priorityChips[$(this).attr("id")].projectID = $(ui.helper).data("originalProjNum");
			
			// Update the chip
			updatePriorityChip(this);
		}
    });
    // Now establish the actual chip values
	updatePriorityChip(chip);
}

var firstTableInit = true;

function initializePriorityTable() {
	// If the chip stage has already been built, then don't do this
	if (firstTableInit) {
		$("#priority-chipStage").each(function( index ) {
 			initializeTableChip(this);
		});
		firstTableInit = false;
	} else {
		// Still need to at least update this chip
		$("#priority-chipStage").each(function( index ) {
 			updatePriorityChip(this);
		});
	}	
	
		
	
	// Builds the table from the data
	$.each( priorityRowData["rows"], function( key, value ) {
		addRowToTable(key);
  		initializeTableRow(key);
	});
}

function clearPriorityTable() {
	// Deletes all rows from the table
	// This is a non-recoverable delete used when new data is delivered
	resetTable();
	
	// reactivate the "Add Row" button
	$("#addRowButton").off("click");
	$("#addRowButton").click(function(event) {
			clickAddRow();		
	});
}

function clickAddRow() {
	addRowToTable();
}


function initializePriorityTable_old() {
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
			//console.log("the drag stopped");
			if ($(ui.helper).data("revert")) {
				//console.log("I returned home");
				// Reset the project number
				priorityChips[$(this).attr("id")].projectID = $(this).data("originalProjNum");
				// Reset the chip
				updatePriorityChip(this);
			} else {
				//console.log("I landed somewhere else");
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
			//console.log("something dropped on a priority chip");
			
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
		//console.log("Setting up a chip");
		$( this ).disableSelection();
	  	updatePriorityChip(this);
	});
}

//console.log("PriorityTable loaded");
