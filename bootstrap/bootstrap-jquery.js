$(document).ready(function(){
    
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
	
	if(window.width() < 768px) {
		$("div.border").removeClass("col-xs-2");
		$("div.border").attr("min-width",2%);
	} else {
		$("div.border").addClass("col-xs-2");
		$("div.border").removeAttr("min-width");
	}
});