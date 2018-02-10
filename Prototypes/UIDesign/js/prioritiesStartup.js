$(document).ready(function(){
	 // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();    
	
	//initializeData();
	newData();
	initializeSaveData();
	initializeLoadData();
	initializeEditProject();
	initializeEditTableRow();
});

function newData() {
	clearHTML();
	initializePortfolio();
	initializePriorityTable();
	initializeArchive();
	initializedoneProjects();
	initializegraveyard();
}

function clearHTML() {
	// These functions are designed to delete the existing DOM/HTML data, but not
	// the values in the global variables.  Those are needed to recreate the correct table!
	clearPriorityTable();
	clearArchive();
	clearDoneProjects();
	clearGraveyard();
}
  
console.log("prioritiesStartup loaded");