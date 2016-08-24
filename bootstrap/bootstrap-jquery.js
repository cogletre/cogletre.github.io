
$( document ).ready( function(){
	
	$("div.border").css( "height", $( "div.main-content" ).height() );
	
	if( $(window).width() < 992) {
		$("div.border").addClass("col-xs-1");
		$("div.main-content").addClass("col-xs-10");
	} else {
		$("div.border").addClass("col-xs-2");
		$("div.main-content").addClass("col-xs-8");
	}
	
	if( $(window).width() < 544) {
		$("div.bio-div").addClass("col-xs-10");
		$("div.photo-div").addClass("col-xs-10");
	} else {
		$("div.bio-div").addClass("col-xs-9");
		$("div.photo-div").addClass("col-xs-3");
	}
	
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


$( window ).resize( function(){
		
	$( "div.border" ).height( $("div.main-content").height() );
	
	if( $(window).width() < 992) {
		$("div.border").addClass("col-xs-1");
		$("div.border").removeClass("col-xs-2");
		$("div.main-content").addClass("col-xs-10");
		$("div.main-content").removeClass("col-xs-8");
	} else {
		$("div.border").addClass("col-xs-2");
		$("div.border").removeClass("col-xs-1");
		$("div.main-content").removeClass("col-xs-10");
		$("div.main-content").addClass("col-xs-8");
	}
	
	
	if( $(window).width() < 544) {
		$("div.bio-div").addClass("col-xs-10");
		$("div.photo-div").addClass("col-xs-10");
		$("div.bio-div").removeClass("col-xs-9");
		$("div.photo-div").removeClass("col-xs-3");
	} else {
		$("div.bio-div").removeClass("col-xs-10");
		$("div.photo-div").removeClass("col-xs-10");
		$("div.bio-div").addClass("col-xs-9");
		$("div.photo-div").addClass("col-xs-3");
	}
});



