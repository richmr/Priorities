$(document).ready(function(){
	 // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$( window ).unload(function() {
		  return exitPriorities();
		});	
	
	$('.modal').modal();    
	
	//initializeData();
	newData();
	initializeSaveData();
	initializeLoadData();
	initializeEditProject();
	initializeEditTableRow();
});

function newData() {
	//console.log("newData() running.");	
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

function exitPriorities() {
	// An attempt to save the data when the user leaves the page, or the window closes
	saveArchive();
	saveGraveyard();
	saveDone();
	saveAllData();
	return "Priorities data saved.";
} 
	 
console.log("prioritiesStartup loaded");