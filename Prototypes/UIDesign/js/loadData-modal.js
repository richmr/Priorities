
$("#load_data").click(function(event) {
		clickOnLoadData();		
	});
	
$("#updateData").click(function (event) {
		clickOnUpdateData();	
	});
	
async function clickOnUpdateData() {
	$("#loadDataModal").modal('close');
	$("#dataAnalysisModal").modal('open');
	$("#dataAnalysis-collection").empty();
	
	// Parse the JSON data
	var dataJSONString = $("#loadDataField").val();
	
	try {
		addDataAnalysisCollectionItem("dataAnalysis-jsoncheck", "Data properly formatted..");
		var theData = JSON.parse(dataJSONString);
		//$("#dataAnalysis-jsoncheck-check").removeClass("grey-text").addClass("green-text");
		dataAnalysisSuccess("dataAnalysis-jsoncheck");		
		
		addDataAnalysisCollectionItem("dataAnalysis-ptable", "Priority table data found..");
		await sleep(2000);
		dataAnalysisSuccess("dataAnalysis-ptable");
		stopDataProgressBar();
		
	} catch(err) {
		//$("#dataAnalysis-jsoncheck-check").removeClass("grey-text").addClass("red-text").text("remove_circle");
		dataAnalysisFail("dataAnalysis-jsoncheck");		
		stopDataProgressBar();
		alert("I'm sorry, your Priorities data is corrupt.  Please check it and try again. Detailed error information below:\n\n"+err.name + ": " + err.message);
		$("#dataAnalysisModal").modal('close');
	}
	
	// Go through the parsed data and make sure it's all there
	
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function addDataAnalysisCollectionItem(id, displayText) {
	// Adds a line to the dataAnalysisCollection display
	var htmlSnippet = `<li class="collection-item" id="${id}"><div>${displayText}<span class="secondary-content"><i id="${id}-check" class="material-icons grey-text">check_circle</i></span></div></li>`
	$("#dataAnalysis-collection").append(htmlSnippet);
}

function dataAnalysisSuccess (id) {
	// Sets the "-check" to a green check circle for id
	$("#"+id+"-check").removeClass("grey-text").addClass("green-text");
	
}

function dataAnalysisFail (id) {
	// Sets the "-check" to a red do not enter for id
	$("#"+id+"-check").removeClass("grey-text").addClass("red-text").text("remove_circle");
		
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
	// Open the modal
	$("#loadDataModal").modal('open');
}


console.log("loadData-modal loaded");