

$(document).ready(function(){
    
	$( "#work-accordion" ).accordion({
		active:-1,
		collapsible:true,
		icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
	});
	
	$( "#projects-accordion" ).accordion({
		active:-1,
		collapsible:true,
		icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
	});
});