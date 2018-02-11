// Global variable for ease
var editRowID;

function initializeEditTableRow() {
	// Turn on the buttons
	$("#saveTableRow").click(function(event) {
		clicksaveTableRow();		
	});	
	
	$("#deleteTableRow").click(function(event) {
		clickdeleteTableRow();		
	});
	
	$("#cancelTableRow").click(function(event) {
		clickcancelTableRow();		
	});
	
	// Enable "Enter" detection on the row name field (same as "Save")
	$("#editTableRow-Title").keypress(function(e) {
	    var keycode = (e.keyCode ? e.keyCode : e.which);
	    if (keycode == '13') {
	        clicksaveTableRow();
	    }
	});
}

function clicksaveTableRow() {
	$("#row-"+editRowID+"-name").text($("#editTableRow-Title").val());
	priorityRowData["rows"][editRowID]["name"] = $("#editTableRow-Title").val();
	
	$("#editTableRowModal").modal("close");
	//dataChanged("priorityRowData");
}

function clickdeleteTableRow() {
	// Safety check is built into the table gen functions
	// It would actually be best to simply have Delete disabled if there are still projects in the row, 
	// but lets go with current flow
	$("#editTableRowModal").modal("close");
	deleteRowFromTable(editRowID);	
}

function clickcancelTableRow() {
	// Data not saved until Save, so just close
	$("#editTableRowModal").modal("close");
}

function editTableRow(rowID) {
	editRowID = rowID;
	$("#editTableRow-Title").val(priorityRowData["rows"][rowID]["name"]);
	$("#editTableRowModal").modal("open");
	$("#editTableRow-Title").focus();
}