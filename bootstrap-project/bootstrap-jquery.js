
$( document ).ready( function(){
	
	$("div.border").height( $("body").height() );
	
	
	$( "#work-accordion" ).accordion({
		active:false,
		collapsible:true,
		icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" },
		heightStyle: "content"
	});
	
	$( "#projects-accordion" ).accordion({
		active:false,
		collapsible:true,
		icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" },
		heightStyle: "content"
	});
	
	
});





