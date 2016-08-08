$( document ).ready(function(){
    
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
		$("div.border").removeClass("col-xs-1");
		$("div.border").attr("min-width",2%);
		$("div.main-content").removeClass("col-xs-10");
		$("div.main-content").addClass("col-xs-12");
	} else {
		$("div.border").addClass("col-xs-1");
		$("div.border").removeAttr("min-width");
		$("div.main-content").addClass("col-xs-10");
		$("div.main-content").removeClass("col-xs-12");
	}
});

$( window ).resize( function(){
	
	$( "div.border" ).height( $(window).height() );
});