// Builds the Priorities table from the loaded data

function rowStart( rowID ) {
	// Returns the html string start of the row
	var rowname = priorityRowData["rows"][rowID]["name"];
	var htmlstring = '<tr id="row-'+rowID+'"><td id="row-'+rowID+'-name">'+rowname+'</td>';
	return htmlstring;
}

function chipSpot(id) {
	// Generates an html snippet for a chip spot with ID id
	var htmlstring = '<li><div id="'+id+'" class="chip"></div></li>';
	return htmlstring;
}

function chipSection( rowID, sectionNum ) {
	// Returns a single chip section, basically a TD cell with a proper count of
	// properly labeled chip locations
	var spotNameStart = "priority-row-"+rowID+"-spot-";
	var numslots = priorityRowData["rows"][rowID]["slots"];
	var countStart = sectionNum * numslots + 1;
	var htmlstring = "<td><ul>";
	for (i = 0; i < numslots; i++) {
		htmlstring += chipSpot(spotNameStart+(countStart+i));
	}
	htmlstring += "</ul></td>";
	return htmlstring;
}

function allChipSections(rowID) {
	// Generates all the chip sections for a given row
	var htmlstring = "";
	for (section = 0; section < priorityRowData["categories"].length; section++) {
		htmlstring += chipSection(rowID, section);	
	}
	return htmlstring;
}

function rowEnd( rowID ) {
	var htmlstring = "</tr>";
	return htmlstring;
}

function rowFromData(rowID) {
	// Generates a whole new row from data
	var htmlstring = rowStart(rowID);
	htmlstring += allChipSections(rowID);
	htmlstring += rowEnd(rowID);
	return htmlstring;
}

function newRow() {
	// Get current row count
	var thisRow = priorityRowData["nextRowID"];
	priorityRowData["rows"][thisRow]=JSON.parse('{"name":"Click to Change", "slots":2}');
	priorityRowData["nextRowID"] += 1;
	return thisRow;
}

function addRowToTable(rowID=false) {
	if (rowID) {
		$("#lastTableRow").before(rowFromData(rowID));
	} else {
		rowID = newRow();
		$("#lastTableRow").before(rowFromData(rowID));
	}
	
	initializeTableRow(rowID);
}

function deleteRowFromTable(rowID, protectProjects = true) {
	// rowID = the ID number, not the DOM ID name
	// if protectProjects, then pops an alert if there are projects still assigned on the row
	if (protectProjects) {
		var projectsDetected = false;
		$('div[id^="priority-row-'+rowID+'"]' ).each(function( index, value ) {
			// Test what the projectID for this DOM element is
			if (priorityChips[value.id]["projectID"] != 0) {
				projectsDetected = true;
			}
		});
		if (projectsDetected) {
			// Set the modal data
			$("#saveProjectsModal-rowname").text($("#row-"+rowID+"-name").text());
			$("#saveProjectsModal").modal('open');
			return;
		}	
	}
	
	// Delete the associated data first
	$('div[id^="priority-row-'+rowID+'"]' ).each(function( index ) {
		// Test what the projectID for this DOM element is
		delete priorityChips[this.id];
	});
	// Delete the row
	$("#row-"+rowID).empty();
}

function resetTable() {
	var lastRowHTML = '<tr id="lastTableRow">' +
							'<td>' +
							'<a class="waves-effect" href="#!">' +
							'<i id="addRowButton" class="small material-icons" style="font-size: 2rem">add_circle_outline</i>' +
							'</a></td></tr>';
	$("#priorityTableDynamicContent").html(lastRowHTML);
}


