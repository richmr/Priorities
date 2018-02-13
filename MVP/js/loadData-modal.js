
$("#load_data").click(function(event) {
		clickOnLoadData();		
	});
	
$("#updateData").click(function (event) {
		clickOnUpdateData();	
	});

$("#pickDataFile").change(function (event) {
		fileChosen();	
	});
	
function clickOnUpdateData(dataJSONString) {
	//$("#loadDataModal").modal('close');
	$("#dataAnalysisModal").modal('open');
	$("#dataAnalysis-collection").empty();
	
	// Parse the JSON data
	//var dataJSONString = fileReader.result;
	
	try {
		var fullSuccess = true;
		addDataAnalysisCollectionItem("dataAnalysis-jsoncheck", "Data properly formatted..");
		var theData = JSON.parse(dataJSONString);
		dataAnalysisSuccess("dataAnalysis-jsoncheck");		
		
		addDataAnalysisCollectionItem("dataAnalysis-portfolios", "Portfolio data...");
		if (portfolios = theData["portfolios"]) {
			dataAnalysisSuccess("dataAnalysis-portfolios");
		} else {
			dataAnalysisFail("dataAnalysis-portfolios", "Portfolio data not found");
			fullSuccess = false;
		}

		addDataAnalysisCollectionItem("dataAnalysis-priorityRowData", "Row data...");
		if (priorityRowData = theData["priorityRowData"]) {
			dataAnalysisSuccess("dataAnalysis-priorityRowData");
		} else {
			dataAnalysisFail("dataAnalysis-priorityRowData", "Row data not found");
			fullSuccess = false;
		}
		
		
		addDataAnalysisCollectionItem("dataAnalysis-ptable", "Chip location data...");
		if (priorityChips = theData["priorityChips"]) {
			dataAnalysisSuccess("dataAnalysis-ptable");
		} else {
			dataAnalysisFail("dataAnalysis-ptable", "Chip location data not found");
			fullSuccess = false;
		}
		
		addDataAnalysisCollectionItem("dataAnalysis-archivedProjects", "Archived projects data...");
		if (archivedProjects = theData["archivedProjects"]) {
			dataAnalysisSuccess("dataAnalysis-archivedProjects");
		} else {
			dataAnalysisFail("dataAnalysis-archivedProjects", "Archived project data not found");
			fullSuccess = false;
		}
		
		addDataAnalysisCollectionItem("dataAnalysis-doneProjects", "Done project data...");
		if (doneProjects = theData["doneProjects"]) {
			dataAnalysisSuccess("dataAnalysis-doneProjects");
		} else {
			dataAnalysisFail("dataAnalysis-doneProjects", "Done project data not found");
			fullSuccess = false;
		}
		
		addDataAnalysisCollectionItem("dataAnalysis-graveyardProjects", "Graveyard projects data...");
		if (graveyardProjects = theData["graveyardProjects"]) {
			dataAnalysisSuccess("dataAnalysis-graveyardProjects");
		} else {
			dataAnalysisFail("dataAnalysis-graveyardProjects", "Graveyard project data not found");
			fullSuccess = false;
		}
		
		addDataAnalysisCollectionItem("dataAnalysis-projects", "Archived projects data...");
		if (projects = theData["projects"]) {
			dataAnalysisSuccess("dataAnalysis-projects");
		} else {
			dataAnalysisFail("dataAnalysis-projects", "No project data found");
			fullSuccess = false;
		}
		
		stopDataProgressBar();
		
		if (fullSuccess) {
			newData();
		} else {
			addDataAnalysisCollectionItem("dataAnalysis-fail", "There are missing pieces of your data, I cannot continue");
			dataAnalysisFail("dataAnalysis-fail");
		}
		
		
		
	} catch(err) {
		// The only catch-able error here is a failed JSON parse
		errText = "Your Priorities data is corrupt -> "+err.name + ": " + err.message;
		dataAnalysisFail("dataAnalysis-jsoncheck", errText);		
		stopDataProgressBar();
	}
	
	
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function addDataAnalysisCollectionItem(id, displayText) {
	// Adds a line to the dataAnalysisCollection display
	var htmlSnippet = `<li class="collection-item" id="${id}"><div><span id="${id}-displayText">${displayText}</span><span class="secondary-content"><i id="${id}-check" class="material-icons grey-text">check_circle</i></span></div></li>`
	$("#dataAnalysis-collection").append(htmlSnippet);
}

function dataAnalysisSuccess (id, displayText = false) {
	// Sets the "-check" to a green check circle for id
	$("#"+id+"-check").removeClass("grey-text").addClass("green-text");
	if (displayText) {
		$("#"+id+"-displayText").text(displayText);	
	}
}

function dataAnalysisFail (id, displayText = false) {
	// Sets the "-check" to a red do not enter for id
	$("#"+id+"-check").removeClass("grey-text").addClass("red-text").text("remove_circle");
	if (displayText) {
		$("#"+id+"-displayText").text(displayText);	
	}	
}

function stopDataProgressBar() {
	$("#dataAnalysisModal-progress").removeClass("indeterminate").addClass("determinate").css("width", "100%");
}

function startDataProgressBar() {
	$("#dataAnalysisModal-progress").removeClass("determinate").addClass("indeterminate");
}

function initializeLoadData() {
	// Loop over the graveyarddProjects array
	
}	

function clickOnLoadData () {
	// Check for saved data
/*	if (wasDataSaved()) {
		// Get all of the saved data
		loadAllData();
		var savedData = makeAllDataJSON();
		// Set the text area
		$("#loadDataField").val(JSON.stringify(savedData));
		// Set the message
		$("#loadDataModal-message").html("I found data saved to your computer.  If you want to use this data, simply click Update.<br>If not, paste your data below and then click Update");
	} else {
		$("#loadDataModal-message").html("Please paste your data below and then click Update");
	}
	*/
	// Interesting "hack" found here: https://stackoverflow.com/questions/10216331/open-file-dialog-box-on-a-tag
	// Transfer the click to the hidden file selector	
	$("#pickDataFile").click();
	//$("#loadDataModal").modal('open');
}

function fileChosen() {
	// Called when the a file has been loaded
	var prioritiesJSONFile = $("#pickDataFile")[0].files[0];
	var fileReader = new FileReader();
	
	// the readAsText function returns immediately and then fires once done reading
	fileReader.onload = function (event) {
		console.log("loaded: "+fileReader.result);
		clickOnUpdateData(fileReader.result);
	}
	fileReader.readAsText(prioritiesJSONFile);
}

//console.log("loadData-modal loaded");