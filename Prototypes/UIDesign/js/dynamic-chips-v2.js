console.log("Dynamic chips activated.");

$( function() {
    $( "#draggable" ).draggable();
  } );
  

function intersectRect(r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

function intersectUI(ui1, ui2) {
	// This code ended up not being used for the purposes of drop detection
	// because a raw jQuery object (the Archive icon) and a "UI" as delivered by
	// the sortable calls have different data structures.
	var rect1 = {
		left: ui1.offset().left,
		top: ui1.offset().top,
		right: ui1.offset().left+ui1.outerWidth(),
		bottom: ui1.offset().top+ui1.outerHeight()
	}
	
	
		
	var rect2 = {
		left: ui2.offset().left,
		top: ui2.offset().top,
		right: ui2.offset().left+ui1.outerWidth(),
		bottom: ui2.offset().top+ui1.outerHeight()
	}
	

	$("#rect1").offset(rect1);
	$("#rect1").height(rect1.top-rect1.bottom);
	$("#rect1").width(rect1.left-rect1.right);
	$("#rect2").offset(rect2);
	$("#rect2").height(rect2.top-rect2.bottom);
	$("#rect2").width(rect2.left-rect2.right);
	
	
	return intersectRect(rect1, rect2);
	
}

function intersectJQOandUI(JQO, UI) {
	var rect1 = {
		left: JQO.offset().left,
		top: JQO.offset().top,
		right: JQO.offset().left+JQO.innerWidth(),
		bottom: JQO.offset().top+JQO.innerHeight()
	}
		
	var rect2 = {
		left: UI.offset.left,
		top: UI.offset.top,
		right: UI.offset.left+UI.item.data().startSize.width/2,  
		bottom: UI.offset.top+UI.item.data().startSize.height
	}
	
	// This code moves the visual indicators around for debugging purposes.
	$("#rect1").offset(rect1);
	$("#rect1").height(JQO.innerHeight());
	$("#rect1").width(JQO.innerWidth());
	$("#rect2").offset(rect2);
	$("#rect2").height(UI.item.data().startSize.height);
	$("#rect2").width(UI.item.data().startSize.width/2);
	
	return intersectRect(rect1, rect2);
	
}

$(function() {
	//$( "#sortable" ).sortable();
	//$('div[id^="priority"]' ).draggable();
	//<ul id="sortable-row1-4" class="row1Priorities">
	$( "#sortable-row1-1, #sortable-row1-2, #sortable-row1-3, #sortable-row1-4" ).sortable({
      connectWith: ".row1Priorities",
      placeholder: "chip chip-placeholder",
      // Added this to prevent crazy cursor grabbing
      cursorAt: {left: 5},
      out: function( event, ui ) {
      	console.log("Chip moved out of list.  Making it draggable");
      	// Make it a draggable, but still connected
      	ui.item.draggable({
      		connectToSortable: ".row1Priorities",
      		helper: "clone",
      		revert: "invalid"
    		});
      },
      over: function( event, ui ) {
      	console.log("Chip moved in to list");
      	ui.item.data("out", false);
      },
      start: function( event, ui) {
      	console.log(`At start->height: ${ui.item.innerHeight()} width: ${ui.item.innerWidth()}`);
			// I only want to set this startSize the first time, when the sizes most accurately represent visual reality      	
      	if (typeof ui.item.data("startSize") == "undefined") {
      		ui.item.data("startSize", {height: ui.item.innerHeight(), width: ui.item.innerWidth()});
      	}
      },
      beforeStop: function( event, ui ) {
      	console.log("Chip released");
      	//var theui = ui
      	if (ui.item.data("out")) {
      		console.log("Chip was released outside of a list");
      		console.log(`At end->height: ${ui.item.innerHeight()} width: ${ui.item.innerWidth()}`);
      		console.log(`Dropped chip offset: ${ui.offset.top}, ${ui.offset.left}`);
				var archiveOffset = $("#archive").offset()    		
      		console.log(`Location of archive: ${archiveOffset.top}, ${archiveOffset.left}`);
      		var intersect = intersectJQOandUI($("#archive"), ui);
      		if (intersect) {
      			console.log("The items are touching");
      			// Hide the item
      			ui.item.hide();
      			
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
      		} else {
      			console.log("They aren't touching");
      		}
      	} else {
      		console.log("Chip inside of list on release")
      	}
       }
      
    });
   $( "#sortable-row1-1, #sortable-row1-2, #sortable-row1-3, #sortable-row1-4" ).disableSelection();
   $( "#archive").droppable({
   	drop: function( event, ui ) {
        console.log("Archive: Something was dropped on me");
      }
   });
   $( "#droppable").mouseenter(function() {
  		console.log("Mouse is over me")
  	});
})
