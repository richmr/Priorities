$( "i" ).click(function(event) {
	//event.stopImmediatePropagation();
  console.log( "Button clicked: " + $( this ).attr( "name" ) );
});

$( "p" ).click(function(event) {
	//event.stopImmediatePropagation();
  console.log( "Text clicked: " + $( this ).attr( "name" ) );
});

$('span[name^="content"]' ).click(function(event) {
	//event.stopImmediatePropagation();
  console.log( "Span Text clicked: " + $( this ).attr( "name" ) );
});
