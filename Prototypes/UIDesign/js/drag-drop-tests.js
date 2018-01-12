$(function() {
	$("#chip1").draggable();
	
	$("#spot1").droppable({
		classes: {
			"ui-droppable-hover": "chip chip-placeholder-hover"
		}
	});
	$("#chip1", "#spot1").disableSelection();
	
})
