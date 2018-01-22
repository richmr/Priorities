$(document).ready(function(){
	 // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();    
	$("#archive").click(function(event) {
		clickOnArchive();		
	});
	initializePriorityTable()
	initializeArchive();
});
  
console.log("prioritiesStartup loaded");