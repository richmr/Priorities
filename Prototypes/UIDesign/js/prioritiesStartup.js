$(document).ready(function(){
	 // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();    
	
	initializeData();
	initializePriorityTable()
	initializeArchive();
	initializedoneProjects();
	initializegraveyard();
	initializeSaveData();
	initializeLoadData();
});
  
console.log("prioritiesStartup loaded");