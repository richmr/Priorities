
$("#save_data").click(function(event) {
		clickOnSaveData();		
	});

function initializeSaveData() {
	// Loop over the graveyarddProjects array
	
}	

function clickOnSaveData () {
	// First save to local storage
	var allData = consolidateData();
	saveAllData();	
	
	// Open the modal
	$("#saveDataModal").modal('open');
	$("#saveDataField").val(JSON.stringify(allData));
	$("#saveDataField").focus();
	$("#saveDataField").select();
	
	
	
}


//console.log("saveData-modal loaded");