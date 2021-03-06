console.log("Dynamic chips v4 activated.");

// Establish the data.
var priorityChips = { "priority-chip1": { "projectID":"1"},
								"priority-chip2": { "projectID":"2"},
								"priority-chip3": { "projectID":"3"},
								"priority-chip4": { "projectID":"4"},
								"priority-chip5": { "projectID":"5"},
								"priority-chip6": { "projectID":"6"},
								"priority-chip7": { "projectID":"7"},
								"priority-chip8": { "projectID":"0"}
							};
							
var projects = { "0": {"title":" ", "status":"chip-placeholder", "draggable":false, "droppable":true},
						"1": {"title":"Extreme 1", "status":"chip-status-red", "draggable":true, "droppable":false},
						"2": {"title":"Extreme 2", "status":"chip-status-green", "draggable":true, "droppable":false},
						"3": {"title":"High 1", "status":"chip-status-yellow", "draggable":true, "droppable":false},
						"4": {"title":"High 2", "status":"chip-status-green", "draggable":true, "droppable":false},
						"5": {"title":"Medium 1", "status":"chip-status-green", "draggable":true, "droppable":false},
						"6": {"title":"Really Long Medium 2", "status":"chip-status-red", "draggable":true, "droppable":false},
						"7": {"title":"Low 1", "status":"chip-status-red", "draggable":true, "droppable":false}
					};

function updatePriorityChip( chip ) {
	// This will update the chip with the most recent data
	// I assume all chips have been marked as draggable and droppable already
	
	var projID = priorityChips[$(chip).attr("id")].projectID;
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
	
}

$(function() {
	//$( "#sortable" ).sortable();
	$('div[id^="priority"]' ).draggable({
      //connectToSortable: ".row1Priorities",
		/*      
      create: function( event, ui ) {
      	updatePriorityChip(this);
		},
		*/
		disabled: true,
      helper: "clone",
      revert: "invalid",
      start: function( event, ui ) {
      	// Store original project number in two places
      	$(this).data("originalProjNum", priorityChips[$(this).attr("id")].projectID);
      	$(ui.helper).data("originalProjNum", priorityChips[$(this).attr("id")].projectID);
      	// Set projectID = 0
      	priorityChips[$(this).attr("id")].projectID = "0"
      	// Reset format
      	$(this).removeClass("chip-status-red chip-status-green chip-status-yellow");
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
     console.log("Something was dropped on me");
		// Hide the item
		ui.helper.hide();
		ui.helper.data("revert", false);
		
		// Disconnect it from sortable
		// Don't think it works like that.  I need to add it to the other sortable somehow
		
		// Connect it to the archive sortable
		// see Above
		
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
