
$("#save_data").click(function(event) {
		clickOnSaveData();		
	});

function initializeSaveData() {
	// Loop over the graveyarddProjects array
	
}	

function clickOnSaveData () {
	// Open the modal
	$("#saveDataModal").modal('open');
	var allData = consolidateData();
	$("#saveDataField").val(JSON.stringify(allData));
}


console.log("saveData-modal loaded");