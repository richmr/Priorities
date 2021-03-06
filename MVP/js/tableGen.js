/*
Copyright 2018 Michael R Rich (mike@tofet.net)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Builds the Priorities table from the loaded data

function rowStart( rowID ) {
	// Returns the html string start of the row
	var rowname = priorityRowData["rows"][rowID]["name"];
	var htmlstring = '<tr id="row-'+rowID+'" class="tableRow"><td style="vertical-align:middle">';
	//htmlstring += '<i class="small material-icons" style="font-size: 2rem">arrow_drop_up</i><i class="small material-icons" style="font-size: 2rem">arrow_drop_down</i>';
	htmlstring += '<span id="row-'+rowID+'-name" class="rowname">'+rowname+'</span></td>';
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
		//$("#lastTableRow").before(rowFromData(rowID));
		$("#priorityTableDynamicContent").append(rowFromData(rowID));
	} else {
		rowID = newRow();
		//$("#lastTableRow").before(rowFromData(rowID));
		$("#priorityTableDynamicContent").append(rowFromData(rowID));
	}
	
	initializeTableRow(rowID);
	////dataChanged();
}

function deleteRowFromTable(rowID, protectProjects = true) {
	// rowID = the ID number, not the DOM ID name
	// if protectProjects, then pops an alert if there are projects still assigned on the row
	if (protectProjects) {
		var projectsDetected = false;
		$('div[id^="priority-row-'+rowID+'"]' ).each(function( index, value ) {
			// Test what the projectID for this DOM element is
			if ((priorityChips[value.id]["projectID"] != 0) && (priorityChips[value.id]["projectID"] != "stage")) {
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
	// Delete the row from the data
	delete priorityRowData["rows"][rowID];	
	saveData("priorityRowData");
	
	//dataChanged();
}

function resetTable() {
	$("#priorityTableDynamicContent").empty();
}


