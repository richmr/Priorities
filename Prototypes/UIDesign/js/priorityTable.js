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

function initializePriorityTable() {
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
	  	updatePriorityChip(this);
	});
}

console.log("PriorityTable loaded");
