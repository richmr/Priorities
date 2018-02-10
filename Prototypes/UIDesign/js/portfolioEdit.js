function initializePortfolio() {
	// Reset the portfolio title
	$("#portfolioName").text(portfolios["name"]);
	
	// Make the name clickable
	$("#portfolioName").off("click");
	$("#portfolioName").click(function(event) {
			clickeditPortfolio();		
	});
	
	// Attach events to the modal buttons
	$("#savePortfolioData").off("click");
	$("#savePortfolioData").click(function(event) {
			clickSavePortfolio();		
	});
	
	$("#cancelPortfolioData").off("click");
	$("#cancelPortfolioData").click(function(event) {
			clickCancelPortfolio();		
	});
	
	// Enable "Enter" detection on the row name field (same as "Save")
	$("#editPortfolioName").off("keypress");
	$("#editPortfolioName").keypress(function(e) {
	    var keycode = (e.keyCode ? e.keyCode : e.which);
	    if (keycode == '13') {
	        clickSavePortfolio();
	    }
	});
}

function clickeditPortfolio() {
	// Set the portfolio name form field
	$("#editPortfolioName").val(portfolios["name"]);
	
	
	// Open the modal
	$("#editPortfolioDataModal").modal("open");
	$("#editPortfolioName").focus();
}

function clickSavePortfolio() {
	portfolios["name"] = $("#editPortfolioName").val();
	initializePortfolio();
	
	$("#editPortfolioDataModal").modal("close");

}

function clickCancelPortfolio() {
	// Just close the modal
	
	$("#editPortfolioDataModal").modal("close");
}