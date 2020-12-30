// Slider variables
var sliderMin=500,sliderMax=1500,sliderVal=1000,stepVal=100,activeTab=0,handle=$('#slider-handle');
// Costs & Savings variables
var serviceSelect=$("input[name='serviceChoice']:checked").val();
var fullYearOneCost,fullTwoYearCost,fullOngoingAnnualCost;
var fullYearOneSavings,fullAnnualSavings,fullROIpayback,fullROIpercent;


var assumedInvoiceFee=$("input[name='currentInvoiceCost']").val();
var assumedInvoiceCost=assumedInvoiceFee*12*sliderVal;
var postGobyInvoiceFee=$("input[name='postgobyInvoiceFee']").val();
var postGobyInvoiceCost=postGobyInvoiceFee*12*sliderVal;
var implementationPeriod=$("input[name='implementationTime']").val();

function formatInput(field) {
	var inputVal=(field.val()*1).toLocaleString(undefined,{minimumFractionDigits:2});
	if(inputVal=="0.00") {
		field.val("");
	} else {
		field.val(inputVal);
	}
	return inputVal;
}

// Implementation variables
var basicImplementationFee,vOnboardingFee,acImplementationFee,wrImplementationFee;
var basicImplementationCost,vOnboardingCost,acImplementationCost,wrImplementationCost;
var implementationFee=4500,fullImplementationCost=0;
// Platform & Bill variables
var basicPlatformFee,basicBillFee=1,billConciergeFee=1.5;
var basicPlatformCost,basicBillCost=basicBillFee*sliderVal,billConciergeCost=0;
var fullPlatformCost,fullBasicBillCost,fullBillConciergeCost;
// Add-on Services variables
var vendorMaintenanceFee,accountCodingFee,workflowRoutingFee,fileIntegrationFee,adapterIntegrationFee;
var vendorMaintenanceCost,accountCodingCost,workflowRoutingCost,fileIntegrationFee,adapterIntegrationCost;
var addonServiceCost,fullAddonServiceCost;
function tabChange(tab) {
	activeTab=tab;
	switch(tab) {
		case 0:
			basicImplementationFee=4500;
			vOnboardingFee=10;
			acImplementationFee=10;
			wrImplementationFee=1500;
			basicPlatformFee=1500;
			vendorMaintenanceFee=600;
			accountCodingFee=300;
			workflowRoutingFee=300;
			fileIntegrationFee=300;
			adapterIntegrationFee=600;
			sliderMax=1500;
			sliderVal=1000;
			stepVal=100;
			sliderMin=500;
			$('#tab-title').text('Starter Plan');
			break;
		case 1:
			basicImplementationFee=16500;
			vOnboardingFee=6;
			acImplementationFee=6;
			wrImplementationFee=5500;
			basicPlatformFee=3000;
			vendorMaintenanceFee=1800;
			accountCodingFee=900;
			workflowRoutingFee=900;
			fileIntegrationFee=900;
			adapterIntegrationFee=1800;
			sliderMax=7500;
			sliderVal=4500;
			stepVal=500;
			sliderMin=1500;
			$('#tab-title').text('Professional Plan');
			break;
		case 2:
			basicImplementationFee=28500;
			vOnboardingFee=3;
			acImplementationFee=3;
			wrImplementationFee=9500;
			basicPlatformFee=6000;
			vendorMaintenanceFee=5400;
			accountCodingFee=2700;
			workflowRoutingFee=2700;
			fileIntegrationFee=2700;
			adapterIntegrationFee=5400;
			sliderMax=80000;
			sliderVal=30000;
			stepVal=1000;
			sliderMin=8000;
			$('#tab-title').text('Enterprise Plan');
			break;
		default:
			basicImplementationFee=4500;
			vOnboardingFee=10;
			acImplementationFee=10;
			wrImplementationFee=1500;
			basicPlatformFee=1500;
			vendorMaintenanceFee=600;
			accountCodingFee=300;
			workflowRoutingFee=300;
			fileIntegrationFee=300;
			adapterIntegrationFee=600;
			sliderMax=1500;
			sliderVal=1000;
			stepVal=100;
			sliderMin=500;
			$('#tab-title').text('Starter Plan');
		break;
	}
	// Implementation costs
	basicImplementationCost=basicImplementationFee;
	vOnboardingCost=vOnboardingFee*sliderVal;
	acImplementationCost=acImplementationFee*sliderVal;
	wrImplementationCost=wrImplementationFee;
	// Platform & Bill annual costs
	basicPlatformCost=basicPlatformFee*12;
	basicBillCost=basicBillFee*sliderVal*12;
	billConciergeCost=billConciergeFee*sliderVal*12;
	// Add-on Service annual costs
	vendorMaintenanceCost=vendorMaintenanceFee*12;
	accountCodingCost=accountCodingFee*12;
	workflowRoutingCost=workflowRoutingFee*12;
	fileIntegrationCost=fileIntegrationFee*12;
	adapterIntegrationCost=adapterIntegrationFee*12;
	fullImplementationCost=calcImplementation();
	fullPlatformCost=calcPlatformCost();
	fullBasicBillCost=calcBasicBillCost();
	fullBillConciergeCost=0;
	fullAddonServiceCost=calcAddonServiceCost();
	//fullYearOneCost=calcYearOneCost();
	//fullOngoingAnnualCost=calcOngoingAnnualCost();
	resetSlider();
	resetROI();
	//calcFullROI();
}
function calcImplementation() {
	basicImplementationCost=basicImplementationFee;
	vOnboardingCost=vOnboardingFee*sliderVal;
	implementationFee=basicImplementationCost+vOnboardingCost;
	if($('#accountCodingCheckbox').prop('checked')==true) {
		acImplementationCost=acImplementationFee*sliderVal;
		implementationFee+=acImplementationCost;
	}
	if($('#workflowRoutingCheckbox').prop('checked')==true) {
		wrImplementationCost=wrImplementationFee;
		implementationFee+=wrImplementationCost;
	}
	//$('#implementationFeeOut').val((implementationFee).toLocaleString(undefined,{minimumFractionDigits:0}));
	return implementationFee;
}
function calcPlatformCost() {
	//$('#monthlyGobyFeeOut').val((basicPlatformCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	return basicPlatformCost;
}
function calcBasicBillCost() {
	basicBillCost=basicBillFee*sliderVal*12;
	//$('#basicBillCost').val((basicBillCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	return basicBillCost;
}
function calcBillConciergeCost() {
	if($('#billConciergeCheckbox').prop('checked')==true) {
		fullBillConciergeCost=billConciergeFee*12*sliderVal;
		//$('#billConciergeCost').val((fullBillConciergeCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	} else {
		fullBillConciergeCost=0;
	}
	//calcFullROI();
	return fullBillConciergeCost;
}
function calcAddonServiceCost() {
	if($('.addonChecked').length>0) {
		fullAddonServiceCost=addonServiceCost;
		//$('#addonServiceCost').val((fullAddonServiceCost).toLocaleString(undefined,{minimumFractionDigits:0}));
		$('#addonServiceOutput').slideDown(500);
	} else {
		addonServiceCost=0;
		fullAddonServiceCost=0;
		$('#addonServiceOutput').slideUp(300);
	}
	//calcFullROI();
	return fullAddonServiceCost;
}
function calcYearOneCost() {
	fullImplementationCost=calcImplementation();
	fullPlatformCost=calcPlatformCost();
	fullBasicBillCost=calcBasicBillCost();
	fullYearOneCost=fullImplementationCost+fullPlatformCost+fullBasicBillCost+fullBillConciergeCost+fullAddonServiceCost;
	//$('#firstYearCost').val((fullYearOneCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	return fullYearOneCost;
}
function calcOngoingAnnualCost() {
	fullPlatformCost=calcPlatformCost();
	fullBasicBillCost=calcBasicBillCost();
	fullOngoingAnnualCost=fullPlatformCost+fullBasicBillCost+fullBillConciergeCost+fullAddonServiceCost;
	//$('#ongoingAnnualCost').val((fullOngoingAnnualCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	return fullOngoingAnnualCost;
}
// Business benefits
function calcYearOneSavings() {
	assumedInvoiceCost=calcAsisCost();
	fullYearOneCost=calcYearOneCost();
	postGobyInvoiceCost=calcPostGobyInvoiceCost();
	fullYearOneSavings=assumedInvoiceCost-(fullYearOneCost+postGobyInvoiceCost);
	//$('#annualSavings').val((fullYearOneSavings).toLocaleString(undefined,{minimumFractionDigits:0}));
	return fullYearOneSavings;
}
var twelveMonthSave,twentyFourMonthSave;
function calcTwelveMonthSave() {
	var twelveInvoiceCost=assumedInvoiceFee*sliderVal*implementationPeriod+postGobyInvoiceFee*sliderVal*(12-implementationPeriod);
	//var twelvePGinvoiceCost=postGobyInvoiceFee*sliderVal*(12-implementationPeriod);
	var twelveMonthGobyCost=calcYearOneCost();
	twelveMonthSave=assumedInvoiceCost-(twelveMonthGobyCost+twelveInvoiceCost);
	return twelveMonthSave;
}
function calcTwentyFourSave() {
	var twentyFourInvCost=assumedInvoiceFee*sliderVal*implementationPeriod+postGobyInvoiceFee*sliderVal*(24-implementationPeriod);
	var twentyFourGobyCost=calcYearOneCost()+calcOngoingAnnualCost();
	twentyFourMonthSave=assumedInvoiceCost*2-(twentyFourInvCost+twentyFourGobyCost);
	return twentyFourMonthSave;
}
function calcAnnualSavings() {
	assumedInvoiceCost=calcAsisCost();
	fullOngoingAnnualCost=calcOngoingAnnualCost();
	postGobyInvoiceCost=calcPostGobyInvoiceCost();
	fullAnnualSavings=assumedInvoiceCost-(fullOngoingAnnualCost+postGobyInvoiceCost);
	//$('#annualSavings').val((fullAnnualSavings).toLocaleString(undefined,{minimumFractionDigits:0}));
	return fullAnnualSavings;
}
function calcPaybackPeriod() {
	fullROIpayback=Math.round(fullYearOneCost/(fullAnnualSavings/12));
	if($('#implementationTime').val()=="") {
		implementationPeriod=8;
	} else {
		implementationPeriod=$('#implementationTime').val()*1;
	}
	//$('#paybackPeriod').val((fullROIpayback+implementationPeriod).toLocaleString(undefined,{minimumFractionDigits:0}) + " months");
	return fullROIpayback+implementationPeriod;
}
function calcReturnPercent() {
	fullTwoYearCost=calcYearOneCost()+calcOngoingAnnualCost();
	fullROIpercent=Math.round((calcTwentyFourSave()/(fullYearOneCost+fullOngoingAnnualCost))*100);
	//$('#roiPercent').val(fullROIpercent.toLocaleString(undefined,{minimumFractionDigits:0}) + "%");
	return fullROIpercent;
}
function displayValues() {
	$('#implementationFeeOut').val((implementationFee).toLocaleString(undefined,{minimumFractionDigits:0}));
	$('#monthlyGobyFeeOut').val((basicPlatformCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	$('#basicBillCost').val((basicBillCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	$('#billConciergeCost').val((fullBillConciergeCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	$('#addonServiceCost').val((fullAddonServiceCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	$('#firstYearCost').val((fullYearOneCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	$('#ongoingAnnualCost').val((fullOngoingAnnualCost).toLocaleString(undefined,{minimumFractionDigits:0}));
	$('#annualSavings').val((fullYearOneSavings).toLocaleString(undefined,{minimumFractionDigits:0}));
	$('#annualSavings').val((fullAnnualSavings).toLocaleString(undefined,{minimumFractionDigits:0}));
	$('#paybackPeriod').val((fullROIpayback+implementationPeriod).toLocaleString(undefined,{minimumFractionDigits:0}) + " months");
	$('#roiPercent').val(fullROIpercent.toLocaleString(undefined,{minimumFractionDigits:0}) + "%");
}
// Run full ROI calculations
function calcFullROI() {
	calcBillConciergeCost();
	calcAddonServiceCost();
	calcYearOneCost();
	calcOngoingAnnualCost();
	calcYearOneSavings();
	calcAnnualSavings();
	calcPaybackPeriod();
	calcReturnPercent();
	displayValues();
}
$('#billConciergeCheckbox').change(function() {
	$(this).toggleClass('billConciergeChecked');
	if($(this).prop('checked')==true) {
		billConciergeCost=billConciergeFee*sliderVal*12;
		$('#billConciergeOutput').slideDown(500);
	} else {
		billConciergeCost=0;
		$('#billConciergeOutput').slideUp(300);
	}
	calcBillConciergeCost();
});
$('#vendorMaintenanceCheckbox').change(function() {
	$(this).toggleClass('addonChecked');
	vendorMaintenanceCost=vendorMaintenanceFee*12;
	if($(this).prop('checked')==true) {
		addonServiceCost+=vendorMaintenanceCost;
	} else {
		addonServiceCost-=vendorMaintenanceCost;
	}
	calcAddonServiceCost();
});
$('#accountCodingCheckbox').change(function() {
	$(this).toggleClass('addonChecked');
	accountCodingCost=accountCodingFee*12;
	if($(this).prop('checked')==true) {
		addonServiceCost+=accountCodingCost;
	} else {
		addonServiceCost-=accountCodingCost;
	}
	calcAddonServiceCost();
});
$('#workflowRoutingCheckbox').change(function() {
	$(this).toggleClass('addonChecked');
	if($(this).prop('checked')==true) {
		workflowRoutingCost=workflowRoutingFee*12;
		addonServiceCost+=workflowRoutingCost;
	} else {
		addonServiceCost-=workflowRoutingCost;
		workflowRoutingCost=0;
	}
	calcAddonServiceCost();
});
$('#fileIntegrationCheckbox').change(function() {
	$(this).toggleClass('addonChecked');
	fileIntegrationCost=fileIntegrationFee*12;
	if($(this).prop('checked')==true) {
		addonServiceCost+=fileIntegrationCost;
	} else {
		addonServiceCost-=fileIntegrationCost;
	}
	calcAddonServiceCost();
});
$('#adapterIntegrationCheckbox').change(function() {
	$(this).toggleClass('addonChecked');
	adapterIntegrationCost=adapterIntegrationFee*12;
	if($(this).prop('checked')==true) {
		addonServiceCost+=adapterIntegrationCost;
	} else {
		addonServiceCost-=adapterIntegrationCost;
	}
	calcAddonServiceCost();
});
var roiRequestLink='https://go.gobyinc.com/request-free-roi-analysis?monthly_invoices_processed=' + sliderVal;
$('#roi-request-link').attr('href',roiRequestLink);

$("input[name='automationLevel']").change(function() {
	//assumedInvoiceFee=$("input[name='automationLevel']:checked").val()*1;
	//calcFullROI();
	closeCallout();
});
function calcAsisCost() {
	if($('#currentInvoiceCost').val()=="") {
		assumedInvoiceFee=16;
	} else {
		assumedInvoiceFee=$('#currentInvoiceCost').val()*1;
	}
	return assumedInvoiceFee*12*sliderVal;
}
function calcPostGobyInvoiceCost() {
	if($('#postgobyInvoiceFee').val()=="") {
		postGobyInvoiceFee=3;
	} else {
		postGobyInvoiceFee=$('#postgobyInvoiceFee').val()*1;
	}
	return postGobyInvoiceFee*12*sliderVal;
}
$("input[name='serviceChoice']").change(function() {
	serviceSelect=$("input[name='serviceChoice']:checked").val();
	switch (serviceSelect) {
		case 'starter':
			tabChange(0);
			break;
		case 'professional':
			tabChange(1);
			break;
		case 'enterprise':
			tabChange(2);
			break;
		default:
			tabChange(0);
		break;
	}
});
function resetROI() {
	$('#monthlyGobyFeeOut').val('');
	$('#basicBillCost').val('');
	$('#billConciergeCost').val('');
	$('#implementationFeeOut').val('');
	$('#firstYearCost').val('');
	$('#ongoingAnnualCost').val('');
	$('#billConciergeCost').val('');
	$('#billConciergeCheckbox')[0].checked=false;
	$('#billConciergeCheckbox').change().removeClass('billConciergeChecked');
	$('#annualSavings').val('');
	$('#paybackPeriod').val('');
	$('#roiPercent').val('');
	for(box in $('.addonChecked')) {
		$('.addonChecked')[box].checked=false;
	}
	$('.addonChecked').change().removeClass('addonChecked');
	calcAddonServiceCost();
}
function resetSlider() {
	$slider.slider("option",{value:sliderVal,max:sliderMax,step:stepVal,min:sliderMin});
	$('#slider-handle').text(sliderVal.toLocaleString(undefined,{minimumFractionDigits:0}));
	closeCallout();
}

// Upgrade callout box for when max limit is reached on invoice slider
function openCallout(level) {
	if(level==2) {
		$('#upgrade-callout2').delay(300).slideDown(500);
	} else {
		$('#upgrade-callout1').delay(300).slideDown(500);
	}
}
function closeCallout() {
	$('.upgrade-callout').slideUp(500);
}
// Slider handle & code
var handle=$('#slider-handle');
$slider = $('#invoice-slider').slider({
	animate:true,
	min:sliderMin,
	max:sliderMax,
	step:stepVal,
	value:sliderVal,
	create: function() {
		handle.text($(this).slider("value").toLocaleString(undefined,{minimumFractionDigits:0}));
		sliderVal=$(this).slider("value");
	},
	slide: function( event, ui ) {
		closeCallout();
		handle.text( ui.value.toLocaleString(undefined,{minimumFractionDigits:0}) );
		sliderVal=ui.value;
		//calcAddonServiceCost();
		//calcFullROI();
	},
	stop: function(event, ui) {
		if(sliderVal == $('#invoice-slider').slider('option','max') && activeTab < 2) {
			openCallout(1);
		} else if(sliderVal == $('#invoice-slider').slider('option','max') && activeTab >= 2) {
			openCallout(2);
		}
		roiRequestLink = 'https://go.gobyinc.com/request-free-roi-analysis?monthly_invoices_processed=' + sliderVal;
		$('#roi-request-link').attr('href',roiRequestLink);
		//calcAddonServiceCost();
		//calcFullROI();
	}
});
// Code for tabs
/*$pricetabs = $("#pricing-tabs").tabs({
	activate:function(event,ui) {
		$newT = ui.newTab.index();
		tabChange($newT);
	},
	hide:{effect:"fade",duration:0,delay:0},
	show:{effect:"fade",duration:300,delay:0},
	active:0
});*/
// Run tab change code on document load
$(document).ready(function(){
	tabChange(0);
});