"use strict";
var weightLock = false, 
	numBoxes,
    $initForm,
    $gradeAmount,
    $displayBtns
    //$gradeAmountSubmit

$(document).ready(function() { 
    $('#input-grades').click(function() {
 		numBoxes = $('#number-of-grades').val();
 		$("h3,form").removeClass("hide");
 		$("p.display,form.display").addClass("hide");
 		createForm(numBoxes);
 		weightLock = false;
   	}); 
	$('#initForm input').keydown(function(e) {
	    if (e.keyCode == 13) {
	    	e.preventDefault();
			numBoxes = $('#number-of-grades').val();
			$("h3,form").removeClass("hide");
			$("p.display,form.display").addClass("hide");
			createForm(numBoxes);
			weightLock = false;
	    }
	});
});

function createForm(fieldnums){
	var boxes=1;
	for (var i=0; i<fieldnums; i++)
	{
		$("#displayform").append("<p><span class='gradeboxlabel'>Grades "+boxes+"</span><span class='weighboxlabel'>Weight"+boxes+"</span></p><input type='text' name='grade"+boxes+"' id='grade"+boxes+"'/> <input type='number' name='weight"+boxes+"' id='weight"+boxes+"'/><input type='button' id='weight-lock"+boxes+"' class='indiv-weight' value='Individual Lock' name='weight-lock"+boxes+"' onclick='lockIndiWeights("+boxes+");'/>");
		boxes=boxes+1;
	}
	addMainBtns();
}

function addMainBtns(){
	$displayBtns = $("#form-buttons");
	var calcBtn = "<a onclick='startCalc();'><input type='button' id='calculate' value='Calculate' name='calculate'/></a>";
	$displayBtns.append(calcBtn);
	var weightBtn = "<a onclick='lockWeights();'><input type='button' id='weight-lock-global' value='Global Weight Lock' name='weight-lock-global'/></a>";
	$displayBtns.append(weightBtn);
	var startOvBtn = "<a onclick='refresh();'><input type='button' id='refresh' value='Start Over' name='refresh' /></a>";
	$displayBtns.append(startOvBtn);
}

function lockWeights(){
	if (weightLock == false){
			var lockem = numBoxes;
			lockem++;
			for (var q=1; q<lockem; q++){
				$('#weight'+q).prop('disabled', true);
				$('#weight-lock'+q).val('Individual Un-Lock');
			}
			$('#weight-lock-global').val('Global Weight Un-Lock');
			weightLock = true;
		}
	else if (weightLock == true){
			var lockem = numBoxes;
			lockem++;
			for (var q=1; q<lockem; q++){
				$('#weight'+q).prop('disabled', false);
				$('#weight-lock'+q).val('Individual Lock');
			}
			$('#weight-lock-global').val('Global Weight Lock');
			weightLock = false;
		}	
}

function lockIndiWeights(num){
	if ($("#weight"+num).prop('disabled') == true){
		$("#weight"+num).prop('disabled', false);
		$("#weight-lock"+num).val('Individual Lock');
		$('#weight-lock-global').val('Global Weight Lock');
		weightLock = false;
	}
	else{
		$("#weight"+num).prop('disabled', true);
		$("#weight-lock"+num).val('Individual Un-Lock');
		$('#weight-lock-global').val('Global Weight Un-Lock');
		weightLock = true;
	}
}

function startCalc(){
	var checkW = weightIsCorrect(numBoxes);
	$(".displaygrade").remove();
	if (checkW ==0){
		var needVars = numBoxes;
		var arr = [];
		needVars++;
		for (var i=1; i<needVars; i++)
		{
			//arr.push($('#grade'+i).val().toUpperCase());
			//arr.push(($('#weight'+i).val())/100);
			//arr.push( [ (letterToNumber($('#grade'+i).val().toUpperCase())),(($('#weight'+i).val())/100) ] );
			arr.push(weightedGrade( (letterToNumber($('#grade'+i).val().toUpperCase())) , (($('#weight'+i).val())/100) ) );
			//console.log($('#weight'+i).val());
			//console.log(($('#weight'+i).val())/100);
		}
		var total=0;
		for(var z=0;z<arr.length;z++)
		{
			total=total+arr[z];
		}

		DisplayGrade(total);
	}
	else{
		$("<p class='displaygrade'>Your weights do not equal 100%.</p>").insertAfter(".mainform1");
	}
}

function weightIsCorrect(numBoxes){
	var weightc = numBoxes;
	weightc++;
	var WeightTrue=100;

	for (var j=1; j<weightc; j++){
		WeightTrue = WeightTrue - ($('#weight'+j).val());
	}

	return WeightTrue;
}

function DisplayGrade(grade){
	var whatgot = "This student got a ";
	switch (true){
		case (grade>94.9):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an A!</p>").insertAfter(".mainform1");
			break;
		case( (grade<95) && (grade>89.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an A-!</p>").insertAfter(".mainform1");
			break;
		case( (grade<90) && (grade>86.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an B+!</p>").insertAfter(".mainform1");
			break;
		case( (grade<87) && (grade>83.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an B!</p>").insertAfter(".mainform1");
			break;
		case( (grade<84) && (grade>79.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an B-!</p>").insertAfter(".mainform1");
			break;
		case( (grade<80) && (grade>74.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an C+!</p>").insertAfter(".mainform1");
			break;
		case( (grade<75) && (grade>69.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an C!</p>").insertAfter(".mainform1");
			break;
		case( (grade<70) && (grade>64.9) ):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an D!</p>").insertAfter(".mainform1");
			break;
		case (grade<65):
			$("<p class='displaygrade'>"+whatgot+grade+"! This student gets an F!</p>").insertAfter(".mainform1");
			break;	
	}	
}

function weightedGrade(grade, weight){
	var val = grade * weight;
	return val;
}

function letterToNumber(letter){
	var numberGrades = {
		'A'  : 98,
		'A-' : 92, 
		'B+' : 88, 
		'B'  : 85, 
		'B-' : 82, 
		'C+' : 78, 
		'C'  : 75, 
		'C-' : 72, 
		'D+' : 68, 
		'D'  : 65, 
		'D-' : 62, 
		'F'  : 62
	};
	return numberGrades[letter];
}

function refresh(){
	location.reload(true);
}