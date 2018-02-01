$(document).ready(function(){
	 // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();    
	
	//initializeData();
	newData();
	initializeSaveData();
	initializeLoadData();
});

function newData() {
	initializePriorityTable();
	initializeArchive();
	initializedoneProjects();
	initializegraveyard();
}
  
console.log("prioritiesStartup loaded");